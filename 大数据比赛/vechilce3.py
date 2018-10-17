import xlrd
import time
import requests


def to_list(nrows):
    data = xlrd.open_workbook(r'E:\code\vscode\大数据比赛\vechicle3.xlsx')
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
        list_i.append(
            int(time.mktime(time.strptime(str(i), '%Y%m%d%H%M%S')))+20995200)
        # 按照先后关系一次进行了，str（）数字化为字符型，然后strptime（）转化为structure_time 格式，最后mktime（）化为时间戳,int型的时间戳
        # 由于百度云要求不能上传一年前的数据点，所以我在得到unix时间戳+1年（以时间戳的格式）来处理，比如去年10月1日，我把数据改为今年10月1日诸如此类
        # vechicle3的数据是从去年10月1日到11月15日，为了防止冲突到2018年吗，所以加了半年 （20995200）     1527782405-1506787205
    return list_i


list_time = to_str(list_time)
data_list = [list_time, list_longtitue, list_latitue]


url = "http://yingyan.baidu.com/api/v3/track/addpoint"

i = 121129
while i <= 186000:
    print(i)
    payload = {
        'ak': 'bHSnEtWG0piz0zGTGF17CxVSG5En2yVX',#杨絮
        "service_id": "205607",
        "entity_name": "3号车",
        "latitude": data_list[2][i],
        "longitude": data_list[1][i],
        "loc_time": data_list[0][i],
        "coord_type_input": "wgs84"
    }
    try:
        response = requests.post(url, data=payload,timeout = 180)
    except:
        response = requests.post(url, data=payload,timeout = 180)
    # print(payload)
    print(response.text)
    try:
        # 如果'status' 不等于0 ，也就是写入不成功，那么久停止循环，先记下来i，然后break进程
        if response.json()['status'] != 0:         
            print('这是3号车')         
            if response.json()['status'] == 302:# 等于这个，则意味着今天测数数量用完了
                with open('vechicle3_post_row_num.text', 'a+') as f1:
                    f1.write(str(i)+'\n'+response.text+'\n')
                break
            if response.json()['status'] ==2: # 2是指某些点不符合要求
                i+=1
                continue
            with open('vechicle3_post_row_num.text', 'a+') as f1:
                f1.write(str(i)+'\n'+response.text+'\n') 
            i -= 1
    except:
        i -= 1
    i += 1
