import requests
import json
from datetime import datetime
from time import time

BASE_URL = 'http://localhost:1484'
API_AUTH = '/mks_access/register'

session = requests.Session()

_data = {
    "RFID": "7511D248",
    "studentID": "b10901085", 
    "timestamp": "2022-02-24 00:00:00"
}

req = session.post(
        BASE_URL + API_AUTH, json=_data,
        allow_redirects=True
)

print(req.json())

