from collections import deque
import re 
import urllib.request
import urllib

queue = deque()
visited = set()

url = 'http://news.dbanotes.net'

queue.append(url)
cnt = 0

while queue:
    url = queue.popleft() #队首元素出列
    visited = {url} #标记为已访问

    print ('已经抓取'+str(cnt)+'    正在抓取----'+url)
    cnt +=1
    
    

        #避免程序异常中断，用TRY ..CATcathch 处理啊异常
    try:
        urlop = urllib.request.urlopen(url, timeout = 2)
        if 'html' not in urlop.getheader('Content-Type'):
            continue
        data = urlop.read().decode('utf-8')
    except:
        continue

    linkre = re.compile('href="(.+?)"')
    for x in linkre.findall(data):
        if 'http' in x and x not in visited:
            queue.append(x)
            print('加入队列---'+x)