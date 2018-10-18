import pandas as pd


def check_file(file_name):
    try:
        f = open(file_name, 'r')
        f.close
        return file_name
    except IOError:
        f = open(file_name, 'w')
        return file_name


data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\track_data.csv')


def get_data(i):
    return data[data['vehicle_id'].isin([i])]


def get_excel_spilt(i):
    data = get_data(i)
    #print (get_data(i).head(),'\n',get_data(i).tail())
    file_path = r"E:\code\vscode\大数据比赛重做版\vehicle"+str(i)+".xlsx"
    writer = pd.ExcelFile(file_path)
    data.to_excel(writer, columns=['time', 'state', 'GPS_lon', 'GPS_lat',
                                   'vehicle_id'], index=False, encoding='utf-8', sheet_name='Sheet')


#get_excel_spilt(4)

#print(get_data(3).head(),'',get_data(3).tail())

data_3 = get_data(3) 

#print(data_3[data_3['time'].isin([20171103203637])])
#print('aaaa')
#print(data['time'].isin([20171103203637]))

data_to_up = data[1014166:]
print(data_to_up.head(),data_to_up.tail())