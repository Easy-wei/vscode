import requests
import re
import os

#案例
# 这是一个图片的url
url = 'http://s6.sinaimg.cn/large/497ccf1eha21e160116a5&690'
response = requests.get(url)
# 获取的文本实际上是图片的二进制文本
img = response.content
# 将他拷贝到本地文件 w 写  b 二进制  wb代表写入二进制文本
with open( './b.jpg','wb' ) as f:
    f.write(img)

# 得到相关网页
def getHtml(url):
    page = requests.get(url)
    html = page.text # requests中对象没有read（）属性，但是有text属性
    return html

#从网页中用re匹配到相应的图片
def getImg(html):
    imglist = re.findall('img src="(http.*?)"',html)#1 #http.*?表示非贪婪模式的匹配，只要符合http就匹配完成，不再看后面的内容是否匹配，即在能使整个匹配成功的前提下，使用最少的重复
    return imglist

html = getHtml("http://blog.sina.com.cn/s/blog_497ccf1e0100rd87.html")
imagesUrl = getImg(html)

if os.path.exists('e:/code/imageDownload') == False:
    os.makedirs("e:/code/imageDownload")

count = 0 # 文件的起始名称为0
for url in imagesUrl:
    print (url)
    if (url.find('.') != -1 ):
        name = url[url.find('.',len(url) - 5 ):]
        bytes = requests.get(url)
        f = open ("e:/code/imageDownload"+str(count)+name,'wb') #打开一个文件以二进制写入
        f.write(bytes.content)# bytes要求的是object对象不是text文本，write 并不是直接写入文件，而是先写入到内存特定的缓冲区
        f.flush()#将缓冲区的数据立即写入缓冲区，并清空缓冲区
        f.close()
        count += 1