import xlrd
import pandas as pd 


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

print(list_longtitue,len(list_longtitue))
