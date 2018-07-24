// (optionally) stop encountering given limit in stepping (don't stop otherwise)
let limit_to_stop_at=10
NCNNSum(limit_to_stop_at) // NCNNs stands for "non-composite natural numbers"

// algorithm implementation for showing that:
/* "every natural number >1 can be obtained 
 as sum of non-composite natural numbers (NCNNs)
 in some way (e.g. you could recurse to have shown more ways)".
 Non-composite natural numbers (NCNNs) are a set
 of numbers very similar to the set of prime
 numbers but it includes 0 and 1.
 I highlight this given the definition of primes starting from 2.
 */
function NCNNSum(limit=NaN){
  let ncnn=[1]
  // (optionally) stop encountering given limit in stepping (don't stop otherwise)
  for(let n of stepper(2,limit)){
    if(isNonCompositeNaturalNumber(n))
      ncnn.push(n)
    let dec=n
    let add=[]
    for(let i=ncnn.length-2;i>=0;i--){
      while(ncnn[i]<=dec && dec!=0){
        // decrement to find the numbers to sum up
        dec-=ncnn[i]
        add.push(ncnn[i])
      }
    }
    // safety check (optional)
    if(n!=sum(add)){
      print('wrong sum')
      break
    }
    print(n+'='+add.join('+'))
  }
}

// like: isPrime but includes 0 and 1
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
