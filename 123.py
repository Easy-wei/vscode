"""
ab8bd593817db867df2e0cbb1ee9dc5d gist_id
ab0f9d7dd4dc4f29c6b454c74beeeb587d02dd7c  token 令牌
312d79cf1088a64b89cc8087687e12915af46fcb    token 令牌
7457f3d31f0b5694919c327f5699ce15 gist_id



def textFormat(dict):
    for key in dict:
        #print('{0:<10}{1:<10}{2:<10}{3}'.format(key,dict[key][day],dict[key][month],dict[key][total]))
        print('{0:<40}{1:<10}'.format(key,dict[key][%s]=%))
"""
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

getCount(url)
for key in result:
    #print(type(result[key]))
    print('{0:<25}{1}'.format(key,result[key]["month"]))
    
def storageText(a):
    with open ('红岸水滴筐数统计.txt','a+') as f1:
        f1.write(a)


#if __name__ == "__main__":
#    getCount()



"""

"""