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

斐波那契
def demo(t):
    array=[]
    a=1
    b=1
    while b<t:
        a=a+b
        array.append(a)
        a,b=b,a+b#右侧ab两值都是比较old的那种，不会和左侧新值产生循环赋值问题（系统内部产生第三个变量作为寄存单位，如下例所示）
    return array

print (demo(130))


def demo(t):
    array=[]
    a=1
    b=1#这种算法默认b每轮都比a大的那种。
    c=0#c作为寄存中转单位
    while b<t:
        c=b
        b=a+b
        a=c#a赋予上一轮b的值
        array.append(b)
               
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

#杨辉三角

def demo(t):
    array=[[1],[1,1]]
    for i in range (2,t):
        array1=[]
        for j in range(0,i+1):
            if j==0:
                array1.append(1)
            elif j==(i):
                array1.append(1)
            else:
                array1.append(array[i-1][j-1]+array[i-1][j])
        array.append(array1)
    return array

lis=demo(10)
for i in range (len(lis)):
    print (lis[i])



#将任何正偶数输出为两个素数和形式

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

def demo(x):
    a=[]
    if x%2!=0:
        print ('the input is not an even')
    else:
        for i in prime(int(x/2)):
            if (x-i) in prime(x):
                a.append((i,x-i))
            else:
                continue
    return a

print(demo(100))


#找到最大公约数和最小公倍数
import math

def demo(x,y):
    a=math.gcd(x,y)
    b=int(x*y/a)
    return [a,b]
    
print (demo(6,8))


import random

def demo(array,x):
    array1=[i for i in array if i<x]
    array2=[j for j in array if j >x]
    array1.append(x)
    for j in array2:
        array1.append(j)
    return array1

lis=list(range(1,10))
random.shuffle(lis)
print (lis)
print (demo(lis,6))
"""



