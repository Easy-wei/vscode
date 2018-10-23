import xlrd
import time
import requests


data = xlrd.open_workbook(r'e:\code\vscode\大数据比赛\vechicle4_3.xlsx').sheets()[0]

def data_split(x):
    row_num = x.nrows #得到列数
    list_return = []
    for i in range(1,row_num):
        struct_time = time.strptime(str(int(x.cell(i,0).value)),'%Y%m%d%H%M%S')
        unix_time = time.mktime(struct_time) # 得到unix时间
        hour = time.strftime('%H',struct_time)
        if int(hour) >= 6 and int(hour) <23:  #剔除了晚上的无用数据 晚上10点以后和凌晨6点前的
            list_return.append([int(unix_time),x.cell(i,2).value,x.cell(i,3).value]) #将这一行的time，经度，纬度组成一个数组加到另一个新数组中
    return list_return


data = data_split(data)

url = "http://yingyan.baidu.com/api/v3/track/addpoint"


for i in range (66822,len(data)):
    print(i)
    payload = {
        "ak": "9GctB73jNG4AGsH6RldMqnCvGzafFylt",
        "service_id": "205445",
        "entity_name": "4_3",
        "latitude": data[i][2],
        "longitude": data[i][1],
        "loc_time": data[i][0],
        "coord_type_input": "wgs84"
    }
    response = requests.post(url, data=payload)
    print(response.text)
    try:
        if response.json()['status'] == 0 :
            i += 1
        else:  
            if response.json()['status'] ==302 :# 等于这个，则意味着今天测数数量用完了
                with open ('vechicle4_3_post_row_num.text','a+') as f1:
                    f1.write(str(i)+'\n'+response.text+'\n')
                break
            if response.json()['status'] ==2: # 2是指某些点不符合要求
                i += 1
                continue
            with open ('vechicle4_3_post_row_num.text','a+') as f1:
                f1.write(str(j)+'\n'+response.text+'\n')
                i += 1
    except:
        pass 