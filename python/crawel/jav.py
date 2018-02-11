import requests

from bs4 import BeautifulSoup

web_info = [] # 存储网站通知页面,即防屏蔽地址，
#不对了(防屏蔽的形式是 https：//announce.+最新网址+/website.php)
web_info.append( "https://announce.javbus2.pw/website.php" ) # 

jav_web = [] # javbus的网址

jav_web.append( "https://www.javbus.info/" ) # 给一个默认地址

# 尝试直接访问 jav_web的地址，如果不能访问，则访问web_info来更新地址

url = jav_web[len(jav_web)-1] # 栈结构，后进先出。

girls = [ 7s4"""佳苗""", 253 """ 麻仓优""" ] # 感兴趣的女优们 ，地址格式url+/star/+女优代码

# print (url, len( jav_web)) 打印网址，检测是否正确

data = requests.get( url ) # 爬网页


""" 
我们要爬的网站可能回被屏蔽，只需要利用data.status_code来
判断是否能访问就足够了, 
一般不会出现 status_code 正确，但是返回404的那种
"""
if data.status_code == 200 : 
    # 如果能访问，我们就访问我们要咨询的女优的信息
    
    else: # 访问防屏蔽网址，得到最新的地址
        web_data = requests.get( web_info[len(web_info)-1])



