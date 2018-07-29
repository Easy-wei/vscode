import requests
import time
import sched

schedule = sched.scheduler(time.time,time.sleep)

url = 'http://redash.honganhome.com/api/queries/1573/results.json?api_key=xlDxNClAVnewK6I2xmW18MtsqHvrgsuMItt25ssP'
#print(requests.get(url).json())

"""
data': {'rows': [{'codenum': 19, 'code': 502, 'event_date': '2018-07-29', 'basket_count': 25, 'device_id': '1103052018053102c9d7abd40004'},
 {'codenum': 32, 'code': 502, 'event_date': '2018-07-29', 'basket_count': 35, 'device_id': '1103012017121302f0fb566f0009'}]}
"""
result1 = requests.get(url).json()['query_result']['data']['rows']

def get_result(url1): #用url1 表明是形参，防止和url歧义
    return requests.get(url1).json()['query_result']['data']['rows']

def zip_dict (x): # 将rows数据这个的list中的device_id 和codenum写入字典，不用list直接相减求出报警次数变化，是因为担心device_id 对不上
    y = dict()
    for i in x :
        y[i['device_id']] = [i['codenum'],i['basket_count']] # 用device_id作为键，报错数量作为值
    return y 


def compass (a,b):
    c= []
    for i in a:
        sub = b[i][0] - a[i][0]
        if sub >=3:
            # 把【device_id， 1min报错数量,筐数】以list形式写入到c，然后return
            c.append([i,sub,b[i][1]])
    a = b # 把result1更新了
    return c 

def sort (x):
    for i in x:

time.sleep(360)
print('aaa')
print (compass(zip_dict(result1),zip_dict( get_result(url))))


