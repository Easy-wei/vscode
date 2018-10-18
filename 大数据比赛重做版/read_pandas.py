import pandas as pd 

data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\track_data.csv')

file_path = r"E:\code\vscode\大数据比赛重做版\track.xlsx"

writer = pd.ExcelFile(file_path)
data.to_excel(writer,columns = ['time','state','GPS_lon','GPS_lat','vehicle_id'],index = False, encoding = 'utf-8',sheet_name = 'Sheet')
