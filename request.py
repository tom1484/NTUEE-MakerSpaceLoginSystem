import requests
import json
from datetime import datetime
from time import time

BASE_URL = 'http://localhost:1484'
API_AUTH = '/mks_access/statistics'
# API_AUTH = '/mks_access/update'

session = requests.Session()

_data = {
    # "RFID": "123", 
    # "timestamp": "2022-02-24 00:00:00"
    "range": {
        "start": "2022-02-23 00:00:00", 
        "end": "2022-02-25 00:00:00"
    }
}

req = session.post(
        BASE_URL + API_AUTH, json=_data,
        allow_redirects=True
)

print(req.json())

