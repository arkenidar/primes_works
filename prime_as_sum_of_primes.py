primes=[0, 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
197, 199] # some primes

def is_prime(n):
    prime=True
    for i in range(2,n):
      if n%i==0:
        prime=False
        break
    return prime

def primes_iterator(start=3,limit=100000000):
    for n in range(start,limit):
       if is_prime(n):
          yield n

def test():
    primes=[0, 1, 2]
    for n in primes_iterator(3): # primes[3:]
        primes.append(n)
        ni=primes.index(n) # index      
        i=ni-1
        dec=n
        a=[] # add
        while True:
            if primes[i]<=dec:
                dec-=primes[i]
                a.append(primes[i])
                if dec==0: break
            i-=1
        a=map(str,a)
        print(n,'=','+'.join(a))

#for n in primes_iterator(0,20): print(n)
test()
