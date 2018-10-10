import xlrd
import time 


def to_list(nrows): 
    data = xlrd.open_workbook(r'C:\Users\Easy-\Desktop\100个数据测试用.xlsx') 
    row_num = data.sheets()[0].nrows
    list = []
    for i in range (1,row_num):   # 不要列名字
        list.append(data.sheets()[0].cell(rowx = i , colx = nrows ).value)
    return list 

list_time = to_list(0)
list_state = to_list(1)
list_longtitue = to_list(2)
list_latitue = to_list(3)

def to_str(x):
    list_i = []
    for i in x:
        i = round(i)
        list_i.append(time.mktime(time.strptime(str(i),'%Y%m%d%H%M%S')))
    return list_i

print (list_time,to_str(list_time))



