import requests
import time
import sched

schedule = sched.scheduler(time.time,time.sleep)

url = 'http://redash.honganhome.com/api/queries/1573/results.json?api_key=xlDxNClAVnewK6I2xmW18MtsqHvrgsuMItt25ssP'
#print(requests.get(url).json())
result1 = requests.get(url).json()['query_result']['data']['rows']

def get_result(url1): #用url1 表明是形参，防止和url歧义
    return requests.get(url1).json()['query_result']['data']['rows']


def compass (a,b):
    c= []
    for i in range(0,len(a)):
        sub = b[i]['codenum']- a[i]['codenum']
        if sub >=3:
            # 把【device_id， 筐数，1min报错数量】以list形式写入到c，然后return
            c.append([b[i]['device_id'],b[i]['basket_count'],sub])
    a = b # 把result1更新了
    return c 

time.sleep(360)
print('aaa')
print (compass(result1,get_result(url)))



#print (result1['query_result']['retrieved_at'],result1['query_result']['data']['rows'][0]['codenum'],result1['query_result']['data']['rows'][0]['device_id'])


