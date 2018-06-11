import requests
import json
import time
import threading
import collections # 用有序字典

result = collections.OrderedDict()#有序字典
url = 'http://tv.honganrobots.com/get_count'

def getCount(url):
    times = time.asctime()
    response = requests.get(url).json()
    result[times] = response

def storageText(a):
    with open ('红岸水滴筐数统计.txt','a+') as f1:
        for key in result:    #print(type(result[key]))
            print('{0}{1}{2}{3}'.format(key,result[key]["day"],result[key]["month"],result[key]["total"]),file=f1)

time_now = time.time()
time_begin = time.time()

while True:
    if ((time.time()-time_now)>60.0):
        time_now = time.time()
        getCount(url)
    if (time.time()-time_begin)>130:
        print('end')
        break

storageText(result)


# getCount(url)

# storageText(result)

#if __name__ == "__main__":
#    getCount()
