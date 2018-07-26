// initalizations
let continuation=()=>print('end')
let timeoutId=null

//here the program starts
//demoFindSum() // if you use this don't simply call sequentialTasks(lines)

function demoFindSum(){
  continuation=()=>{
    continuation=()=>print('end')
    findSum(8,nonCompositeNaturalNumbersGenerator)}
  findSum(8,naturalNumbersGenerator)
  //busyStop()
}
let nextId=0
let lines2=[
  ()=>eventLoopStepper((n)=>write(n+' '),()=>nextId++,1,150),
  ()=>{print('end');nextId++},
  ()=>eventLoopStepper((n)=>write(n+' '),()=>nextId++,1,10),
  ()=>{print('end');nextId++},
  //()=>nextId=null, // unnecessary but left as an example of an option of use
]
continuation=()=>nextId++
let lines=[
  ()=>findSum(8,naturalNumbersGenerator),
  //()=>nextId=null, // comment this
  ()=>findSum(8,nonCompositeNaturalNumbersGenerator),
  //...lines2 // this is a better way of putting lines2 to execution
]
sequentialTasks(lines)
//sequentialTasks(lines2) // symbolic use, literal use would be wrong
function sequentialTasks(lines){
    let currentId=null
    let intervalId=setInterval(select)
    function select(){
        if(nextId!=currentId && nextId in lines){
            currentId=nextId
            lines[currentId]()
        }else if(!(nextId in lines)){
          clearInterval(intervalId)
        }
    }
}

// algorithm implementation for showing that:
/* "every natural number starting from 2 can be obtained 
 as sum of "non-composite natural numbers" (NCNNs)
 in some way (e.g. you could recurse to have shown more ways)".
 Non-composite natural numbers (NCNNs) are a set
 of numbers very similar to the set of prime
 numbers but this set includes 0 and 1.
 I highlight this given the definition of primes starting from 2.
 */
function findSum(
    limit=NaN,
    generator=naturalNumbersGenerator,
    filterFunction=isNonCompositeNaturalNumber
  ){
  print('findSum() limit set to',limit)
  print('findSum() generator set to',generator.name)
  print('findSum() filterFunction set to',filterFunction.name)

  // natural numbers filtered by the filter function
  // (default: non-composite natural numbers)
  let start=2
  let numbers=[0,1]
  // (optionally) stop encountering given limit in stepping (don't stop otherwise)
  if(typeof window=='undefined'){
    for(let n of generator(start,limit))
      if(findSumN(n)=='stop') break
    continuation()
  }else{
    let skip={
      stepper: (n)=>false,
      nonCompositeNaturalNumbersGenerator: (n)=>!isNonCompositeNaturalNumber(n),
    }
    eventLoopStepper(findSumN,continuation,start,limit,skip[generator.name])
  }
  function findSumN(n){
    if(filterFunction(n))
      numbers.push(n)
    let decremented=n
    let addends=[]
    for(let i=numbers.length-2;i>=0;i--){
      while(numbers[i]<=decremented && decremented!=0){
        // decrement to find the numbers to sum up
        decremented-=numbers[i]
        if(numbers[i]==0)
          break
        addends.push(numbers[i])
      }
    }
    if(addends.length==0){
      print(n,' no addends found for',n)
    }else{
      // safety check (optional)
      if(n!=sum(addends)){
        print('wrong sum',n,addends)
        return 'stop'
      }
      print(n+'='+addends.join('+'))
    }
    return numbers
  }
}

// stepper loop harmonized with event-loop
function eventLoopStepper(block=console.log,continuation=()=>{},
    start=0,limit=NaN,skip=(x)=>false,increment=1){
  if(isNaN(limit)||start<=limit){
      let retval
      if(!skip(start)) retval=block(start)
      if(retval!='stop')
        // call stack is not filled (event loop is used instead)
        timeoutId=setTimeout(()=>eventLoopStepper(block,continuation,
          start+increment,limit,skip,increment))
      else continuation()
  }else continuation()
}

// similato to isPrime(n) but includes 0 and 1 in its set of valid numbers
function isNonCompositeNaturalNumber(n){
  let prime=true
  for(let i of naturalNumbersGenerator(0,n-1)){
    if(n%i==0 && i!=1){
      prime=false
      break
    }
  }
  return prime
}

function* nonCompositeNaturalNumbersGenerator(start,limit){
  for(let n of naturalNumbersGenerator(start,limit))
    if(isNonCompositeNaturalNumber(n))
      yield n
}

// utility functions

function* naturalNumbersGenerator(start=0, limit=NaN, step=1){
  function continueIf(i){
    return i<=limit || isNaN(limit)
  }
  function validLimit(){
    return limit>=start || isNaN(limit)
  }
  if(!validLimit()) return
  // WARNING: a for loop is not harmonized with event-loop, unless made so!
  for(let i=start; continueIf(i); i+=step)
    yield i
}

function print(...args){
  if(typeof p!='undefined')
    p(...args)
  else if(typeof console!='undefined')
    console.log(...args)
}

function write(...args){
  if(typeof w!='undefined')
    w(...args)
  else if(typeof console!='undefined')
    console.log(...args)
}

function sum(array){
  const reducer=(accumulator, currentValue) => accumulator + currentValue
  return array.reduce(reducer)
}

// stop for preventing closing a process window
function busyStop(){
  // if there is browser window there is no need to prevent closing
  if(typeof window!='undefined') return
  print('program is stopped');
  while(true){}
}
