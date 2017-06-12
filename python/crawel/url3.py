
#encoding:UTF-8
import urllib.request
 
url = "https://www.baidu.com"
data = urllib.request.urlopen(url)

print (type(data))

print (data.geturl(),'s',data.getheader())

print (data.info())
#print(data)