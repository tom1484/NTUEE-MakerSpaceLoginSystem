import requests
import json
from datetime import datetime
from time import time

BASE_URL = 'http://localhost:1484'
API_AUTH = '/mks_access'

session = requests.Session()

_data = {
    "RFID": "123", 
    "timestamp": str(datetime.fromtimestamp(time())), 
}

req = session.post(
        BASE_URL + API_AUTH, json=_data,
        allow_redirects=True
)

print(req.json())

