import xlrd
import time
import requests
import json

data = xlrd.open_workbook(r'd:\code\vscode\大数据比赛重做版\vehicle2.xlsx').sheets()[0]

check_url = "http://yingyan.baidu.com/api/v3/track/gettrack"
post_url = "http://yingyan.baidu.com/api/v3/track/addpoints"

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

i = 224
while i < 3000:
    print(i)
    lost_list = []
    params = {
        "ak": "9GctB73jNG4AGsH6RldMqnCvGzafFylt",
        "service_id": "205445",# shilei
        "entity_name": "4_10",
        "start_time": data[i * 100][0],  # unix时间戳格式
        "end_time": data[i * 100 + 99][0]  # 结束时间和起止时间能超过24小时, 24小时=86399s
    }
    check_response = requests.get(check_url, params=params)
    if check_response.json()['status']==0:
        if check_response.json()['total'] == 100:
            i+=1
            print('跳过')
            continue # 如果不等于的话，那就顺序执行到else下一部分的
    else:
        print(check_response.text)
        with open(__file__ + '.text', 'a+') as f1:
            f1.write(str(i) + '\n' + check_response.text + '\n')
        print('跳过')
        i += 1
        continue
    point_list = []
    j = i * 100
    print('未跳过')
    while j < (i + 1) * 100:
        dict_1 = {
            "entity_name": "4_10",
            "latitude": data[j][2],
            "longitude": data[j][1],
            "loc_time": data[j][0],
            "coord_type_input": "wgs84"
        }
        point_list.append(dict_1)
        j += 1
    payload = {
        "ak": "9GctB73jNG4AGsH6RldMqnCvGzafFylt",
        "service_id": "205445",# shilei
        "point_list": json.dumps(point_list)
    }
    response = requests.post(post_url, data=payload)
    print(response.text)
    try:
        if response.json()['status'] == 0:
            if response.json()['success_num'] != 100:
                with open(__file__ + '.text', 'a+') as f4:
                    f4.write(str(i) + '\n' + response.text + '\n')
            i += 1
        else:
            if response.json()['status'] == 302:  # 等于这个，则意味着今天测数数量用完了
                with open(__file__ + '.text', 'a+') as f1:
                    f1.write(str(i) + '\n' + response.text + '\n')
                break
            if response.json()['status'] == 401:  # 401指并发量超过限制，限制访问，于是
                time.sleep(6)  #没有i -=1因为不成功，干脆不+1
                continue
            with open(__file__ + '.text', 'a+') as f1:
                f1.write(str(i) + '\n' + response.text + '\n')
    except:
        pass
