import xlrd

excelfile = xlrd.open_workbook(r'C:\Users\Easy-\Desktop\比赛处理后的数据.xlsx')

print (excelfile.sheet_by_name("track_data2"))
