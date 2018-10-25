import requests
import json

url = "http://yingyan.baidu.com/api/v3/track/addpoints"


payload = {
    "ak": "G5LVTcCxDy6DyuCOnpjXrCINSnagcS03",  # 杨絮的账户
    "service_id": "205605",
    "point_list": json.dumps([  # 这里必须处理为json格式才行，而不是类似json格式
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
         }])
}

response = requests.post(url, data=payload)

print(response.text)
while i < 10000:
    point_list = []
    dict = {}
    dict = {"entity_name": "123",
            "latitude": data[][],
            "longitude": data[][],
            "loc_time": data[][],
            "coord_type_input": "wgs84"}
    point_list.append(dict)
