import requests

url = "http://yingyan.baidu.com/api/v3/track/addpoints"


payload = {
    "ak": "9GctB73jNG4AGsH6RldMqnCvGzafFylt",
    "service_id": "205445",
    "point_list": [
        {"entity_name": "3",
                  "latitude": "31.767862",
                  "longitude": "117.267296",
                  "loc_time": "1525125410",
                  "coord_type_input": "wgs84"},
        {"entity_name": "3",
         "latitude": "31.767862",
         "longitude": "117.267296",
         "loc_time": "1525125440",
         "coord_type_input": "wgs84"}]
}

response = requests.post(url, data=payload)

print(response.text)
