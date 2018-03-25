import urllib3

response= urllib3.request('http://www.baidu.com')

print (response.read())
