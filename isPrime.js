let limit=10
for(let n of primesGenerator(0,limit+1)){
  print(n)
}

function isPrime(n){
  let prime=true
  for(let i of range(0,n)){
    if(n%i==0 && i!=1){
      prime=false
      break
    }
  }
  return prime
}

function* primesGenerator(start,limit){
  for(let n of range(start,limit))
    if(isPrime(n))
      yield n
}

function* range(start, limit, step=1){
  function continueIf(i){
    return i<limit || isNaN(limit)
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
