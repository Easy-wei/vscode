"""
2号车是一辆公交车，每天的行驶里程基本固定：230.1km
那就查工作了多少天呗，先把数据提交了再说
"""

import pandas as pd
import time
import json

data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\track_data.csv')


def get_data(i,data):
    return data[data['vehicle_id'].isin([i])]


def day_time(x):
    list_time = []
    for i in x:
        list_time.append(time.strftime(
            '%Y%m%d', time.strptime(str(i), '%Y%m%d%H%M%S')))
        # 返回的是每天的日期，用处在下
    return list_time


data_2 = get_data(2,data)['time']
data_1 = get_data(1,data)['time']
data_3 = get_data(3,data)['time']
data_4 = get_data(4,data)['time']

def len_f(list_x):
    day_list = day_time(list_x)
    new_day_list = []
    for i in day_list:
        if i not in new_day_list:
            new_day_list.append(i)
    return new_day_list 

def json_save(x,y):
    with open ('date.json','a+') as f:
        json.dump(dict(x=y),f)

date_save('vehicle1',len_f(data_1))#61
date_save('vehicle2',len_f(data_2))
date_save('vehicle3',len_f(data_3))#107
date_save('vehicle4',len_f(data_4))#122