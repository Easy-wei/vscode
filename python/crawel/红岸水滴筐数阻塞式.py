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
            print('{0:<25}{1:<10}{2:<10}{3:<10}'.format(key,result[key]["day"],result[key]["month"],result[key]["total"]),file=f1)

time = int(time.time())

while ((time.time()-time)>60):
    time = time.time()
    getCount(url)

storageText(result)


# getCount(url)

# storageText(result)

#if __name__ == "__main__":
#    getCount()
