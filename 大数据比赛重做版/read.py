import pandas as pd


def check_file(file_name):
    try:
        f = open(file_name, 'r')
        f.close
        return file_name
    except IOError:
        f = open(file_name, 'w')
        return file_name

def get_excel_spilt(i):
    data = get_data(i)
    #print (get_data(i).head(),'\n',get_data(i).tail())
    file_path = r"E:\code\vscode\大数据比赛重做版\vehicle"+str(i)+".xlsx"
    writer = pd.ExcelFile(file_path)
    data.to_excel(writer, columns=['time', 'state', 'GPS_lon', 'GPS_lat',
                                   'vehicle_id'], index=False, encoding='utf-8', sheet_name='Sheet')

def get_excel(data,file_path):
    writer = pd.ExcelFile(file_path)
    data.to_excel(writer,columns=['time', 'state', 'GPS_lon', 'GPS_lat',
                                   'vehicle_id'], index=False, encoding='utf-8', sheet_name='Sheet')

def get_csv(data,file_path):
    data.to_csv(file_path,index = False, sep=',')



data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\track_data.csv')


def get_data(i):
    return data[data['vehicle_id'].isin([i])]

data_3_to_up = get_data(3).loc[1014166:1285435]

print(data_3_to_up.head(),'\n',data_3_to_up.tail())

get_csv(data_3_to_up,r'E:\code\vscode\大数据比赛重做版\vehicle3.csv')

#data_3_to_up.to_csv(r'E:\code\vscode\大数据比赛重做版\vehicle3.csv',index= False.sep=',')
