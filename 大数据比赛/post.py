import requests


url = "http://yingyan.baidu.com/api/v3/track/addpoint"


payload = {
    "ak": "G5LVTcCxDy6DyuCOnpjXrCINSnagcS03",  # 杨絮的账户
    "service_id": "205605",
    "entity_name": "试验车",
    "latitude": "39.738102",
    "longitude": "116.339485",
    "loc_time": "1506787205",
    "coord_type_input": "wgs84"
}

response = requests.post(url, data=payload)

print(response.text)
print( response.text[0])
print( response.text[10])

print(response.json()['status'])
print(response.status_code)
if response.json()['status'] != 0:
    with open('row_num.text', 'a') as f1:
        f1.write('\n fuck23434\n '+response.text,)

