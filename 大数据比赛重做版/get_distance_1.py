import requests
import time
import pandas as pd

url = "http://yingyan.baidu.com/api/v3/track/getdistance?process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving"


def day_dis(start_time):
    payload = {
        "ak": "9GctB73jNG4AGsH6RldMqnCvGzafFylt",
        "service_id": "205445",
        "entity_name": "1号车",
        "is_processed": '1',       # 0,1.1是纠偏，0是关闭纠偏
        "supplement_mode": "driving",
        "start_time": start_time,  # unix时间戳格式
        "end_time": start_time+86399  # 结束时间和起止时间能超过24小时, 24小时=86399s
    }
    try:
        response = requests.get(url, params=payload, timeout=120)
    except:
        response = requests.get(url, params=payload, timeout=120)
    return response


def get_day(x):
    return time.strftime('%Y%m%d', time.strptime(str(x), '%Y%m%d%H%M%S'))


def get_unix(x):
    return int(time.mktime(time.strptime(str(x), '%Y%m%d%H%M%S')))



def all_dis(start_time, end_time):
    start_time = get_unix(start_time)
    i = 0  # i的实际意义就是开车累计天数了
    distance = 0.0  # 返回值是float类型
    list_dis = []
    while start_time <= get_unix(end_time):
        response = day_dis(start_time)
        if response.json()['status'] == 0:
            distance += response.json()['distance']
            list_dis.append(response.json()['distance'])
        else:
            print(response.text)
            with open('distance_get_error', 'a+') as f:  # get报错，存储并且跳过
                f.write(response.text+'vehicle_id:' +
                        'date:'+str(start_time)+'\n')
            continue
        start_time += 86400
        i += 1
    return [distance, i, list_dis, len(list_dis)]


print(all_dis(20180501000000, 20180630235956))
"""
with open('distance_save', 'a+') as f2:  # get报错，存储并且跳过
    f2.write(all_dis(20171018141302,20171103025735)+'\n')
"""
