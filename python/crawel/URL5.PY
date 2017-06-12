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
    urlop = urllib.request.urlopen(url)