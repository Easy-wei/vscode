import requests
import time
import pandas as pd

url = "http://yingyan.baidu.com/api/v3/track/getdistance?process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving"


def unix_time(x):
    list_i = []
    for i in x:
        i = round(i)
        list_i.append(int(time.mktime(time.strptime(str(i), '%Y%m%d%H%M%S'))))
        # 按照先后关系一次进行了，str（）数字化为字符型，然后strptime（）转化为structure_time 格式，最后mktime（）化为时间戳,int型的时间戳
        # 由于百度云要求不能上传一年前的数据点，所以我在得到unix时间戳+1年（以时间戳的格式）来处理，比如去年10月1日，我把数据改为今年10月1日诸如此类
        # vechicle3的数据是从去年10月1日到11月15日，为了防止冲突到2018年吗，所以加了半年 （20995200）     1527782405-1506787205
    return list_i


"""
ak = [['ak':'TlTzw9HRtZiewa3Gre1udCiGrGU3tiAa',  # 一跃
       "service_id":'205618',
       "entity_name": "4号车第二个10万"], []]
"""


def day_dis(start_time):
    payload = {
        'ak':'TlTzw9HRtZiewa3Gre1udCiGrGU3tiAa', # 一跃
        "service_id":'205618',
        "entity_name": "4_6",
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
    return time.mktime(time.strptime(str(x), '%Y%m%d%H%M%S'))


def get_data(id, data):  # 筛选vehicle_id的小函数
    return data[data['vehicle_id'].isin([id])]


def all_dis(num, data):
    data_list = data['unix_time']
    start_time = min(data_list)+20995200
    i = 0  # i的实际意义就是开车累计天数了
    distance = 0.0  # 返回值是float类型
    list_dis = []
    while start_time < max(data_list)+20995200:
        response = day_dis(start_time)
        if response.json()['status'] == 0:
            distance += response.json()['distance']
            list_dis.append(response.json()['distance'])
        else:
            print(response.text)
            with open('distance_get_error', 'a+') as f:  # get报错，存储并且跳过
                f.write(response.text+'vehicle_id:'+str(num) +
                        'date:'+str(get_day(start_time))+'\n')
            continue
        i += 1
        start_time += 86400
    return [distance, i, list_dis]


data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\track_data.csv')
new_time = pd.DataFrame({'time': data['time'],
                         'unix_time': unix_time(data['time'])})

data = pd.merge(data, new_time, on=['time'], how='left')

data = get_data(4, data)[90000:180000]
print(data.head(1), '\n', data.tail())

print(all_dis(4, data))
with open('distance_save', 'a+') as f2:  # get报错，存储并且跳过
    f2.write(all_dis(4, data)+'\n')
