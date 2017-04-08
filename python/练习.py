from math import pi as PI
"""
def circleare(a):
    if isinstance(a,int) or isinstance(a,float):
        return a**2*pi
    else :
        print ("you should input a number\end='\n'")

x=int(input('input the circle radius'))
print (circleare(x))


def demo(*a):
    avg=sum(a)/len(a)
    g=[i for i in a if i>avg]
    return (avg,g)

print (demo(1,2,3,4))



def demo(a):
    result=[0,0]
    for i in a :
        if 'a'<=i<='z':
            result[0]+=1
        elif 'A'<=i<='Z':
            result[1]+=1
    return result
print (demo('aDaaaadsdfdfdsfasdFADSFASDFDSfdadsfafsDFADd '))



def demo(list,k):
    if k>len(list):
        print ('k is over the lenght of list')
    x=list[:k]
    x.reverse()
    y=list[k:]
    y.reverse()
    r= x+y
    r.reverse()
    return r

a=[i for i in range(1,21)]
print(demo(a,5))


def demo(t):
    array=[]
    a=1
    b=1
    while b<t:
        a=a+b
        array.append(a)
        a,b=b,a
    return array


print (demo(130))


import random

def demo(lis):
    a=min(lis)
    for i in range (len(lis)-1):
        if lis[i]==a:
            b=i
            break
    return (a,b)

lis=[random.randint(1,20) for i in range(20)]

print (lis)

print (demo(lis))

"""
