import urllib
import urllib.request

data = {}
data['world']= 'Jecvay Notes'

url_values = urllib.parse.urlencode(data)
url = 'https://www.baidu.com/s?'
full_url= url+url_values

data2= urllib.request.urlopen(full_url).read()
data2= data2.decode('UTF-8')
print (data2)