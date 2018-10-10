import time
j = 20180501055520.0
j = round(j)
i = str(j)
print(i,j,time.mktime(time.strptime(i,'%Y%m%d%H%M%S')))
