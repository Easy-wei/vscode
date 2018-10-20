import requests
import time
import pandas as pd

url = "http://yingyan.baidu.com/api/v3/track/getdistance?process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving"


"""

ak = [
    ['TlTzw9HRtZiewa3Gre1udCiGrGU3tiAa',  # 艺跃
     '205618'],
    ["9GctB73jNG4AGsH6RldMqnCvGzafFylt",  # 石磊
     "205445"],
    ['DXt4xEUfWtpvKBaQhloIAPYeyCO4zFPn',  # 天怡
     "205606"],
    ['jUXBKfOGMqDoEI9cMrMVUuvKGxb8uOwx',  # 于飞
     "205608"],
    ['bHSnEtWG0piz0zGTGF17CxVSG5En2yVX',  # 杨絮
     "205607"]
]

entity_list = ['1号车',
               "3号车",
               "4号车前10万",
               "4号车第二个10万",
               "4号车第三份",
               "4号车_4段",
               "4_5",
               "4_6",
               "4_7",
               "4_8",
               ]

"""

def day_dis(start_time):
    payload = {
        'ak': 'bHSnEtWG0piz0zGTGF17CxVSG5En2yVX',#杨絮
        "service_id": "205607",
        "entity_name": "3号车",
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
    start_time = get_unix(start_time)+20995200  # +了一个半年的时间
    i = 0  # i的实际意义就是开车累计天数了
    distance = 0.0  # 返回值是float类型
    list_dis = []
    while start_time <= get_unix(end_time)+20995200:
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


print(all_dis(20171001000015, 20171103203637))
"""
with open('distance_save', 'a+') as f2:  # get报错，存储并且跳过
    f2.write(all_dis(20171018141302,20171103025735)+'\n')
"""
