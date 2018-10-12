import requests


url = "http://yingyan.baidu.com/api/v3/track/addpoint"


payload = {
    "ak": "9GctB73jNG4AGsH6RldMqnCvGzafFylt",
    "service_id": "205445",
    "entity_name": "3",
    "latitude": "39.738102",
    "longitude": "116.339485",
    "loc_time": "1538984296",
    "coord_type_input": "wgs84"
}

response = requests.post(url, data=payload)

print(response.text)
