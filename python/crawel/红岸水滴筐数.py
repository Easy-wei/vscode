"""
{
    0px:0;
    93px:1;
    186px:2;
    279px:3;
    372px:4
    290px:5;
    558px:6;
    651px:7;
    744px:8;
    522px:9;
}
这是原来的办法，后来在js中发现json来源，直接解析json就可以了

以时间为键，获得的json作为值，写成字典，到时候十分钟统一写入text中
"""
import requests
import os
import json
import time

time = time.asctime()
#引入时间，作为键,
# 这是json的url
url = 'http://tv.honganrobots.com/get_count'
# 这是从js中拿到的json数据
response = requests.get(url).json()
"""
拿到json
格式是{'total':1212,'day':1212,'month':1221}的字典型结构,而不是json结构，wtf！！
不信你试试  print (isinstance(response,dict))
用dict做值
"""
result = dict()
result[time] = response

print(result)

#print(aa)

#print(is_json(response))