import requests

# 这是一个图片的url
url = 'http://s6.sinaimg.cn/large/497ccf1eha21e160116a5&690'
response = requests.get(url)
# 获取的文本实际上是图片的二进制文本
img = response.content
# 将他拷贝到本地文件 w 写  b 二进制  wb代表写入二进制文本
with open( './b.jpg','wb' ) as f:
    f.write(img)
