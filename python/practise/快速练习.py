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

print ('a')
print ( lis = demo(10) )