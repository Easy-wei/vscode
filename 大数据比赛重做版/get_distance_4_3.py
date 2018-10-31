import requests
import time
import pandas as pd
import xlrd

url = "http://yingyan.baidu.com/api/v3/track/getdistance?process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving"

data = xlrd.open_workbook(r'd:\code\vscode\大数据比赛重做版\vehicle2.xlsx').sheets()[0]


def data_split(x):
    row_num = x.nrows  # 得到列数
    list_return = []
    for i in range(1, row_num):
        struct_time = time.strptime(
            str(int(x.cell(i, 0).value)), '%Y%m%d%H%M%S')
        unix_time = time.mktime(struct_time)  # 得到unix时间
        hour = time.strftime('%H', struct_time)
        if int(hour) >= 7 and int(hour) < 20:  # 剔除了晚上的无用数据 晚上8点以后和凌晨7点前的
            # 将这一行的time，经度，纬度组成一个数组加到另一个新数组中
            list_return.append(
                [int(unix_time),
                 x.cell(i, 2).value,
                 x.cell(i, 3).value])
    return list_return

data = data_split(data)


def day_dis(start_time):
    payload = {
        'ak': 'DXt4xEUfWtpvKBaQhloIAPYeyCO4zFPn',
        "service_id": 205606,# tianyi
        "entity_name": "2",
        "is_processed": '1',  # 0,1.1是纠偏，0是关闭纠偏
        "supplement_mode": "driving",
        "start_time": start_time,  # unix时间戳格式
        "end_time": start_time + 86399  # 结束时间和起止时间能超过24小时, 24小时=86399s
    }
    try:
        response = requests.get(url, params=payload, timeout=120)
    except:
        response = requests.get(url, params=payload, timeout=120)
    return response


def all_dis(start_time, end_time):
    i = 0  # i的实际意义就是开车累计天数了
    distance = 0.0  # 返回值是float类型
    list_dis = []
    while start_time <= end_time:
        response = day_dis(start_time)
        if response.json()['status'] == 0:
            distance += response.json()['distance']
            list_dis.append(response.json()['distance'])
        else:
            print(response.text)
            with open(__file__ + '.text', 'a+') as f:  # get报错，存储并且跳过
                f.write(response.text + 'vehicle_id:' + 'date:' +
                        str(start_time) + '\n')
            continue
        start_time += 86400
        i += 1
    return [distance, i, list_dis, len(list_dis)]


print(all_dis(data[517400][0],data[616900][0] ))
