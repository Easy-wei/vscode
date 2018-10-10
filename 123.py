"""
ab8bd593817db867df2e0cbb1ee9dc5d gist_id
ab0f9d7dd4dc4f29c6b454c74beeeb587d02dd7c  token 令牌
312d79cf1088a64b89cc8087687e12915af46fcb    token 令牌
7457f3d31f0b5694919c327f5699ce15 gist_id

"""



"""

"""
a = int( input('a='))
b = int( input('b='))
print ('a*b=',str(a*b))

import requests

url = "http://yingyan.baidu.com/api/v3/track/addpoints"

payload = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"ak\"\r\n\r\n9GctB73jNG4AGsH6RldMqnCvGzafFylt\r\n
------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"service_id\"\r\n\r\n205445\r\n
------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"point_list\"\r\n\r\n[{\"entity_name\": \"3\",\"latitude\": \"31.767862\",\"longitude\":\"117.267296\",\"loc_time\":\"1525125410\",\"coord_type_input\": \"wgs84\"},{\"entity_name\": \"3\",\"latitude\": 31.767862,\"longitude\":117.267296,\"loc_time\":1525125440,\"coord_type_input\": \"wgs84\"}]\r\n
------WebKitFormBoundary7MA4YWxkTrZu0gW--"
headers = {
    'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    'cache-control': "no-cache",
    'postman-token': "020889e0-1402-9bb2-cf4b-d174bec1f46c"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)