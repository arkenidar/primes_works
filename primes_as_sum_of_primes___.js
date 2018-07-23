
// the algorithm for: "a prime as sum of primes" (for every prime starting from 0)

// @ repl.it: https://repl.it/@dariocangialosi/primesassumofprimesjs
// @ gist.github.com: https://gist.github.com/arkenidar/91198b654b119c97284588d6451117c6/

////////////////////////////////////////

// try prime_sum
prime_sum(150)

// the algorithm for: "a prime as sum of primes"
function prime_sum(limit=NaN){ // limit set to NaN is no-limit
  var primes=[]
  // (for every prime starting from 0)
  for(let n of primesGenerator(0,limit+1)){
    primes.push(n)
    let i=primes.indexOf(n)-((n>1)?1:0)
    let dec=n
    let add=[]
    while(true){
      do{
        if(primes[i]<=dec){
          dec-=primes[i]
          add.push(primes[i])
          if(dec==0){
            success=true
            break
          }
        }  
      }while(primes[i]<=dec)
      i-=1
      if(i<0){
        break
      }
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

// this is what was ported:
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

// array.append() in PY <-> array.push() in JS
// 'string'.join(array) in PY <-> array.join('string') in JS

////////////////////////////////////////
