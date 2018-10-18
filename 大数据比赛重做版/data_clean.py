import pandas as pd
import time
import random
# data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\track_data.csv')


def unix_time(x):
    list_i = []
    for i in x:
        i = round(i)
        list_i.append(int(time.mktime(time.strptime(str(i), '%Y%m%d%H%M%S'))))
        # 按照先后关系一次进行了，str（）数字化为字符型，然后strptime（）转化为structure_time 格式，最后mktime（）化为时间戳,int型的时间戳
        # 由于百度云要求不能上传一年前的数据点，所以我在得到unix时间戳+1年（以时间戳的格式）来处理，比如去年10月1日，我把数据改为今年10月1日诸如此类
        # vechicle3的数据是从去年10月1日到11月15日，为了防止冲突到2018年吗，所以加了半年 （20995200）     1527782405-1506787205
    return list_i


def hour_time(x):
    list_time = []
    for i in x:
        list_time.append(time.strftime(
            '%H', time.strptime(str(i), '%Y%m%d%H%M%S')))
        # 返回的是每天的小时时间，用处在下
    return list_time


def day_time(x):
    list_time = []
    for i in x:
        list_time.append(time.strftime(
            '%Y%m%d', time.strptime(str(i), '%Y%m%d%H%M%S')))
        # 返回的是每天的日期，用处在下
    return list_time


"""
根据可视化显示结果，在晚上的时候，司机会休息，则上报意义没用，漂移点也没必要统计，
反正要绑定路线，确定启动的标志，如果没有state的标志，
那么根据以往数据统计，漂移在多少多少之间认为是熄火，然后删除，保留一两个点即可
1个小时内经度相差为0.0003以内，纬度相差0.0002以内
那么就求某个小时内的经纬度差距在这个以内，则认为熄火静止，保留一个点，其他剔除
"""
data = pd.read_csv(r'E:\code\vscode\大数据比赛重做版\vehicle3.csv')

new_time = pd.DataFrame({'time': data['time'],
                         'hour_time': hour_time(data['time']),
                         'day_time': day_time(data['time'])})

# print(new_time.head(),'\n',data.head(),'\n',new_time.tail())

new_data = pd.merge(data, new_time, on=['time'], how='left')


print(new_data.head(10))

#print(new_data.head(1000).groupby(['day_time','hour_time']).GPS_lon.max(),'\n',new_data.head(1000).groupby(['day_time','hour_time']).GPS_lon.min())

print  (new_data.head(3000).groupby(['day_time','hour_time']).GPS_lon.max()-new_data.head(3000).groupby(['day_time','hour_time']).GPS_lon.min())