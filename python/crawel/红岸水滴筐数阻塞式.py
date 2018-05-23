import requests
import json
import time
import threading
import collections # 用有序字典

result = collections.OrderedDict()#有序字典
url = 'http://tv.honganrobots.com/get_count'

def getCount():
    times = time.asctime()
    response = requests.get(url).json
    result[times] = response
    storageText(str(result))
    
def textFormat(dict):
    for key in dict:
        
    


def storageText(a):
    with open ('红岸水滴筐数统计.txt','a+') as f1:
        f1.write(a)


getCount()

#if __name__ == "__main__":
#    getCount()
