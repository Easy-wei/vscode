import requests
 
response  = requests.get("https://www.baidu.com")
print(type(response))
print(response.status_code)
print(type(response.text))
 
response.enconding = "utf-8"
#print(response.text)
print ('AA')
print(response.cookies)
 
print(response.content)
print('BB')
print(response.content.decode("utf-8"))