// @ repl.it: https://repl.it/@dariocangialosi/primesassumofprimesjs
// @ gist.github.com: https://gist.github.com/arkenidar/91198b654b119c97284588d6451117c6/
////////////////////////////////////////

primeSum()

// the algorithm for: "a prime as sum of primes"
function primeSumPrimes(limit=NaN){
  var primes=[]
  for(let n of primesGenerator(0,limit+1)){
    primes.push(n)
    let dec=n
    let add=[]
    for(let i=primes.indexOf(n)-((n>1)?1:0);i>=0;i--){
      while(primes[i]<=dec && dec!=0){
        dec-=primes[i]
        add.push(primes[i])
      }
    }
    add.push(0)
    print(n+'='+add.join('+'))
  }
}

// the algorithm for: "a natural number as sum of primes"
function primeSum(limit=NaN){
  var primes=[0,1]
  for(let n of range(2,limit+1)){
    if(isPrime(n))primes.push(n)
    let dec=n
    let add=[]
    for(let i=primes.length;i>=0;i--){
      while(primes[i]!=n && primes[i]<=dec && dec!=0){
        dec-=primes[i]
        add.push(primes[i])
      }
    }
    if(n!=sum(add)){
      print('wrong sum')
      break
    }
    print(n+'='+add.join('+'))
  }
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

////////////////////////////////////////
// porting from Python to JavaScript
// (JavaScript equivalents to Python functions)
// this is what was ported (same concept, older, pythonic implementation):
// https://gist.github.com/arkenidar/249fb90aaa46a381494049bea41606c3

function str(x){
  return x.toString()
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

function sum(array){
  const reducer=(accumulator, currentValue) => accumulator + currentValue
  return array.reduce(reducer)
}

// array.append() in PY <-> array.push() in JS
// 'string'.join(array) in PY <-> array.join('string') in JS
////////////////////////////////////////
