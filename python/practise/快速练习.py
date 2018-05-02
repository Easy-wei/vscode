import time

def prime(x):
    a=[2,3]
    for i in range(2,x+1):
        k=0
        for j in a:
            if i%j==0:
                k=1
                break
            
        if k==1:
            continue
        else:
            a.append(i)
    return a

def prime1(x):
    a=[2,3]
    for i in range(2,x+1):
        k=0
        for j in a:
            if i%j==0:
                k = 0
                break
            
        if k==1:
            continue
        else:
            a.append(i)
    return a

start = time.clock()
a = prime (100000)
end = time.clock()-start
print (end)

start = time.clock()
b = prime1 (100000)
end = time.clock()-start
print (end)
print ( b )

"""
t= time.time
b = prime1 ( 100 )

print (time.time - t )
 
print ( b )
"""