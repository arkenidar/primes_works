// (optionally) stop encountering given limit in stepping (don't stop otherwise)
let limit_to_stop_at=15
findSum(limit_to_stop_at)
// added stop() to prevent process from closing
stop()

// NCNNs stands for "non-composite natural numbers"

/*
0=0
1=1
2=1+1
3=2+1
4=2+2
5=3+2
6=3+3
7=5+2
8=5+3
9=5+3+1
10=5+5
11=7+3+1
12=7+5
13=11+2
14=11+3
15=11+3+1
...
etcetera
*/

// algorithm implementation for showing that:
/* "every natural number starting from 2 can be obtained 
 as sum of non-composite natural numbers (NCNNs)
 in some way (e.g. you could recurse to have shown more ways)".
 Non-composite natural numbers (NCNNs) are a set
 of numbers very similar to the set of prime
 numbers but it includes 0 and 1.
 I highlight this given the definition of primes starting from 2.
 */
function findSum(limit=NaN,filterFunction=isNonCompositeNaturalNumber){
  print('limit set to',limit)
  // natural numbers filtered by the filter function
  // (default: non-composite natural numbers)
  let start=0
  let numbers=[]
  // (optionally) stop encountering given limit in stepping (don't stop otherwise)
  for(let n of stepper(start,limit)){
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
      print('no addends found for',n)
    }else{
      // safety check (optional)
      if(n!=sum(addends)){
        print('wrong sum',n,addends)
        break
      }
      print(n+'='+addends.join('+'))
    }
  }
}

// similato to isPrime(n) but includes 0 and 1 in its set of valid numbers
function isNonCompositeNaturalNumber(n){
  let prime=true
  for(let i of stepper(0,n-1)){
    if(n%i==0 && i!=1){
      prime=false
      break
    }
  }
  return prime
}

function* nonCompositeNaturalNumbersGenerator(start,limit){
  for(let n of stepper(start,limit))
    if(isNonCompositeNaturalNumber(n))
      yield n
}

// utility functions

function* stepper(start=0, limit=NaN, step=1){
  function continueIf(i){
    return i<=limit || isNaN(limit)
  }
  function validLimit(){
    return limit>=start || isNaN(limit)
  }
  if(!validLimit()) return
  for(let i=start; continueIf(i); i+=step)
    yield i
}

function print(...args){
  console.log(...args)
}

function sum(array){
  const reducer=(accumulator, currentValue) => accumulator + currentValue
  return array.reduce(reducer)
}

function stop(){ print('program is stopped'); while(true){} }
