import xlrd
import time
import requests


def to_list(nrows):
    data = xlrd.open_workbook(r'E:\code\vscode\大数据比赛\vechicle1.xlsx')
    row_num = data.sheets()[0].nrows
    list = []
    for i in range(1, row_num):   # 不要列名字
        list.append(data.sheets()[0].cell(rowx=i, colx=nrows).value)
    return list


list_time = to_list(0)
list_state = to_list(1)
list_longtitue = to_list(2)
list_latitue = to_list(3)


def to_str(x):
    list_i = []

    for i in x:
        i = round(i)
        list_i.append(int(time.mktime(time.strptime(str(i), '%Y%m%d%H%M%S'))))
        # 按照先后关系一次进行了，str（）数字化为字符型，然后strptime（）转化为structure_time 格式，最后mktime（）化为时间戳,int型的时间戳
    return list_i


list_time = to_str(list_time)
data_list = [list_time, list_longtitue, list_latitue]


url = "http://yingyan.baidu.com/api/v3/track/addpoint"

i = 30929
while i < 100000:
    print(i)
    payload = {
        "ak": "G5LVTcCxDy6DyuCOnpjXrCINSnagcS03", # 杨絮的账户
        "service_id": "205605",
        "entity_name": "1号车后6万",
        "latitude": data_list[2][i],
        "longitude": data_list[1][i],
        "loc_time": data_list[0][i],
        "coord_type_input": "wgs84"
    }
    response = requests.post(url, data=payload)
    #print(payload)
    print(response.text)
    try:
        if response.json()['status'] != 0: # 如果'status' 不等于0 ，也就是写入不成功，那么久停止循环，先记下来i，然后break进程
            with open ('vechicle4_post_row_num.text','a+') as f1:
                f1.write(str(i)+'\n'+response.text+'\n')
                i -= 1
            if response.json()['status'] == 302:# 等于这个，则意味着今天测数数量用完了
                with open ('vechicle4_post_row_num.text','a+') as f1:
                    f1.write(str(i)+'\n'+response.text+'\n')
                break
    except:
        i -=1
    i += 1
