import requests
import time

result = []

url = 'http://tv.honganrobots.com/get_count'

#print (response)
"""
def storageText(a):
    # 一种思路是写成字典，另外一种是写成矩阵[[时间，筐数，筐数，筐数][时间二，筐数，筐数，筐数]]
    with open ('红岸水滴筐数统计.txt','a+') as f1:
        for key in a:
            f1.
            print ("{0:<25}{1:<10}{2:<10}{3:<10}".format(key,result[key]["day"],result[key]["month"],result[key]["total"]),file = f1)
"""
def storageText (a):
    with open ('红岸水滴筐数统计2.txt','a+') as f2:
        for key in a :
            f2.write(str(key)+'\n')
def run():
    response = requests.get(url).json()
    num_total = 0
    time_begin = time.time()

    while True:
        if num_total == response['total'] :
            response = requests.get(url).json()
        else:
            num_total = response['total']
            record_time = time.asctime()
            num_array = [record_time,response['day'],response['month'],response['total']]
            result.append(num_array)
            if (time.time()-time_begin) >= 60:
                print (result)
                storageText(result)
                time_begin = time.time()

run()

"""
url = 'http://tv.honganrobots.com/get_count'
# 这是从js中拿到的json数据

getCount(url) = requests.get(url).json()
拿到json
格式是{'total':1212,'day':1212,'month':1221}的字典型结构,而不是json结构，wtf！！
"""

