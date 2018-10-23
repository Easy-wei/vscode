import requests

url = "http://yingyan.baidu.com/api/v3/track/addpoints"


payload = {
    "ak": "G5LVTcCxDy6DyuCOnpjXrCINSnagcS03",  # 杨絮的账户
    "service_id": "205605",
    "point_list": [
        {"entity_name": "123",
         "latitude": "31.767862",
         "longitude": "117.267296",
         "loc_time": "1525125410",
         "coord_type_input": "wgs84"
         },
        {"entity_name": "3344",
         "latitude": "31.767862",
         "longitude": "117.267296",
         "loc_time": "1525125440",
         "coord_type_input": "wgs84"
         }]
}

response = requests.post(url, data=payload)

print(response.text)
