
import urllib.request
import http.cookiejar
 

def saveFile(data):
    save_path = 'd:\'
    f_obj = open (save_path,'wb') #wb 表示打开方式
    f_obj.write(data)
    f_obj.close()

# head: dict of header

def makeMyopener(head = { 
    'Connection': 'Keep-Alive',
    'Accept': 'text/html, application/xhtml+xml, */*',
    'Accept-language': 'en-US,en;q=0.8,zh-Hans-CN; q = 0.5 ,zh-Hans; q = 0.3'
    'User-Agent': 'Mozilla/5.0(windows NT 6.3; WOW64; Trident/7.0; rv:11.0) likeGecko'  
}):
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    header = []
    for key, value in head.items():
        elem = (key, value)
        header.append(elem)
    opener.addheaders = header
    return opener

oper = makeMyopener()

url = 'http://www.baidu.com/'

uop = oper.open(url, timeout = 1000)

data = uop.read()
print(data.decode())