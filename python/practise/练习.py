import random

# from math import pi as PI


"""
def circleare(a):                 #求直径
    if isinstance(a,int) or isinstance(a,float):
        return a**2*pi
    else :
        print ("you should input a number\end='\n'")

x=int(input('input the circle radius'))
print (circleare(x))


def demo(*a):  # 输出均值和所有大于均值的数
    avg=sum(a)/len(a)        #均值
    g=[i for i in a if i>avg]         #所有大于均值的数
    return (avg,g)

print (demo(1,2,3,4))



def demo(a):        #统计字符串里大小写的数量
    result=[0,0]
    for i in a :
        if 'a'<=i<='z':
            result[0]+=1 #  统计小写数量       
        elif 'A'<=i<='Z':
            result[1]+=1
    return result
print (demo('aDaaaadsdfdfdsfasdFADSFASDFDSfdadsfafsDFADd '))


# 找到一个list，从中第k个数截取，然后前k个数排序，后n-k个数排序，然后重组。
# 给出下角标k，然后前k哥数逆序放到最后，后n-k逆序放到前面

def demo(list,k):
    if k>len(list):
        print ('k is over the lenght of list')
    x=list[:k]  # 截取前k个数
    x.reverse() # 前k个数逆序。
    y=list[k:]  # 截取后n-k个数。
    y.reverse() # 后n-k个数逆序。
    r= x+y      # 重组
    r.reverse() # 重组后再逆序，图个啥！
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
        a,b=b,a+b  # 右侧ab两值都是比较old的那种，不会和左侧新值产生循环赋值问题（系统内部产生第三个变量作为寄存单位，如下例所示）
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
# 返回最小值的下角标
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
    array=[[1],[1,1]] # 先写好杨辉三角的前两行
    for i in range (2,t):  # 
        array1=[]    # 设置一个空数组 作为array一行一行的填充
        for j in range(0,i+1):
            if j==0:
                array1.append(1) #左右均取1
            elif j==(i):
                array1.append(1)  #左右均取1
            else:
                array1.append(array[i-1][j-1]+array[i-1][j])  # 某行的某列等于上一行的左列加相邻右列
        array.append(array1)
    return array

lis = demo(10)
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

def demo(x):
    a,b,c,d=0,0,0,0
    for i in x:
        if 'a'<=i<='z':
            a=a+1
        elif 'A'<=i<='Z':
            b=b+1
        elif 0<=int(i)<=9:
            c=c+1
        else :
            d=d+1
    return (a,b,c,d)
    
print (demo('dafdsfqwefewfreqgqiojfewJ192409439857321985JSjKJKDJSLAJLojsajsJSJ'))


from functools import reduce
def demo(*x):
    return(max(x),reduce(lambda c,d:c+d,x))

print (demo(1,2,3,5,6,3,32,56,67,34,5,876,654))


# filename:myarray.py
# function description: array and its operating

"""

import types


class MyArray:
    #all the elements in this array must be numbers
    __value=[]
    __size=0

    def __IsNumber(self, n):
        if type(n) != types.ComplexType and type(n) != types.FloatType and type(n) != types.IntType and type(n) != types.LongType:
            return False
        return True

    def __init__(self, *args):
        for i in args:
            if not self.__IsNumber(args):
                print("ALL elements must be numbers")
                return
        self.__value = []
        for j in args:
            self.__value.append(j)
        self.__size = len.(args)

    def __add__(self, n):
        if not self.__IsNumber(n):
            print('+operating with ', type(n),
                  'and number type is not supported.')
            return
        b = MyArray()
        for v in self.__value:
            b.__value.append(v + n)
        return b

    def __sub__(self, n):
        if not self.__IsNumber(n):
            print('-operating with ', type(n),
                  'and number type is not supported.')
            return
        b = MyArray()
        for v in self.__value:
            b.__value.append(v - n)
        return b

    def __mul__(self, n):
        if not self.__IsNumber(n):
            print('*operating with ', type(n),
                  'and number type is not supported.')
            return
        b = MyArray()
        for v in self.__value:
            b.__value.append(v * n)
        return b

    def __div__(self, n):
        if not self.__IsNumber(n):
            print('/operating with ', type(n),
                  'and number type is not supported.')
            return
        b = MyArray()
        for v in self.__value:
            b.__value.append(v / n)
        return b

    def __mod__(self, n):
        if not self.__IsNumber(n):
            print('%operating with ', type(n),
                  'and number type is not supported.')
            return
        b = MyArray()
        for v in self.__value:
            b.__value.append(v % n)
        return b

    def __pow__(self, n):
        if not self.__IsNumber(n):
            print('**operating with ', type(n),
                  'and number type is not supported.')
            return
        b = MyArray()
        for v in self.__value:
            b.__value.append(v**n)
        return b

    def __len__(self):
        return len(self.__value)

# for:m
# when use the object as a statement diectly the function will be called
    def __repr__(self):
        # equaivalent to return "self.__value"
        return repr(self.__value)
    # for : print x

    def __str__(self):
        return str(self.__value)

    def append(self, v):
        if not self.__IsNumber(v):
            print('Only number can be appended')
            return
        self.__value.append(v)
        self.__size += 1

    def __getitem__(self, index):
        if self.__IsNumber(index) and 0 <= index <= self.__size:
            if self.__IsNumber(v):
                self.__value[index] = v
            else:
                print(v, 'is not a number')
        else:
            print(index, 'is not a number or out of range')

    # member test.support  the keyword 'in'

    def __contains__(self, v):
        if v in self.__value:
            return True
        return False

    # dot product
    def dot(self, v):
        if not isinstance(v, MyArray):
            print(v, 'must be an instance of MyArray')
            return
        if len(v) != self.__size:
            print('The size must be equal')
            return
        b = MyArray()
        for m, n in zip(v.__value, self.__value):
            b.__value.append(m * n)
            return sum(b.__value)

    # equal to
    def __eq__(self, v):
        if not isinstance(v, MyArray):
            print(v, 'must be an isinstance of MyArray')
            return
        if cmp(self.__value, v.__value) == 0:
            return True
        return False
    # less than

    def __lt__(self, v):
        if not isinstance(v, MyArray):
            print(v, 'must be an isinstance of MyArray')
            return
        if self.__value < v.__value:
            return True
        return False


if __name__ == '__main__':
    print('Please use me as a module')
"""

"""
# 冒泡算法


def sort(array):
    n = len(array)
    k = n
    for i in range(n):
        flag = 1
        for j in range(1, k):
            if array[j-1] > array[j]:
                array[j-1], array[j] = array[j], array[j-1]
                k = j
                flag = 0
            else:
                pass
        if flag == 1:
            break
    return array


array_ex = [random.randint(1, 20) for i in range(random.randint(1, 20))]

print(array_ex)

print(sort(array_ex))
