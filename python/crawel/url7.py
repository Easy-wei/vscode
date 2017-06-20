
import urllib.request
import http.cookiejar
 

def saveFile(data):
    save_path = 'd:\\url.html'
    f_obj = open (save_path,'wb') #wb 表示打开方式
    f_obj.write(data)
    f_obj.close()

# head: dict of header

def makeMyopener(head = { 
    'Connection': 'keep-alive',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-language':'zh-CN,zh;q=0.8,ja;q=0.6,en-US;q=0.4,en;q=0.2,en-GB;q=0.2',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
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

url = 'https://www.baidu.com/'

uop = oper.open(url, timeout = 1000)

data = uop.read()
print('ask')
saveFile(data)
print(data)

"""
GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
DNT: 1
Accept-Encoding: gzip, deflate, sdch, br
Accept-Language: zh-CN,zh;q=0.8,ja;q=0.6,en-US;q=0.4,en;q=0.2,en-GB;q=0.2
Cookie: BDUSS=zRVR2l0eTdBUDQ3aXJQcHhxUzlSNDlILXJwflpudEpHVmJzYjAtRjF-UGtBRUZaSVFBQUFBJCQAAAAAAAAAAAEAAABpNnpN2K3YrUVhc3nYrditAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAORzGVnkcxlZb; BAIDUID=DFE10D2D446D16C96DE4511FE928FA0D:FG=1; BIDUPSID=DFE10D2D446D16C96DE4511FE928FA0D; PSTM=1497533024; H_PS_645EC=c027P1jgMdzqJn1h8aI%2BGXlTvLZxMUN3%2FMuXMK2Wd09sIVeGf8jEESy0I8A; BD_CK_SAM=1; PSINO=5; BD_HOME=1; H_PS_PSSID=1421_13548_21089_18559_17001_20927; BD_UPN=12314753; sugstore=0
"""