NCNNSum(10000)

// algorithm for showing that:
/* "every natural number >=3 can be obtained 
 as sum of non-composite natural numbers (NCNNs) of some kind" */
function NCNNSum(limit=NaN){
  var ncnn=[1,2]
  for(let n of stepper(3,limit)){
    if(isNonCompositeNaturalNumber(n))
      ncnn.push(n)
    let dec=n
    let add=[]
    for(let i=(ncnn.length-1)-((n>1)?1:0);i>=0;i--){
      while(ncnn[i]<=dec && dec!=0){
        dec-=ncnn[i]
        add.push(ncnn[i])
      }
    }
    if(n!=sum(add)){
      print('wrong sum')
      break
    }
    print(n+'='+add.join('+'))
  }
}

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
