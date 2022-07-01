import serial
import requests
import json
from datetime import datetime
import time as t
import string
import tkinter as tk

def identify(port):
    send = '1'
    for counter in range(50):
        port.write(send.encode())
        rec = port.read(1).decode()
        if rec == '1':
            print("rec = %s, %s is connected to rfid"%(rec,port.name))
            return True
    return False


def get_timestamp():
    current_time = t.localtime(t.time())
    if(current_time.tm_mon < 10) : _mon = "0"+str(current_time.tm_mon)
    else:mon = str(current_time.tm_mon)
    if(current_time.tm_mday < 10) : _day = "0"+str(current_time.tm_mday)
    else:day = str(current_time.tm_mday)
    if(current_time.tm_hour < 10) : _hour = "0"+str(current_time.tm_hour)
    else:_hour = str(current_time.tm_hour)
    if(current_time.tm_min < 10) : _min = "0"+str(current_time.tm_min)
    else:_min = str(current_time.tm_min)
    if(current_time.tm_sec < 10) : _sec = "0"+str(current_time.tm_sec)
    else:_sec = str(current_time.tm_sec)
    #current_time.tm_year-current_time.tm_mon-current_time.tm_mday current_time.tm_hour:current_time.tm_min:current_time.tm_sec
    time_stamp = "{}-{}-{} {}:{}:{}".format(current_time.tm_year,_mon,_day,_hour,_min,_sec)
    return time_stamp

def sending_data(rfid_data):
    global text
    print(rfid_data)
    time_stamp = get_timestamp()
    print(time_stamp)

    _rdata = {
        "RFID": rfid_data,
        # "RFID": "B508C347", 
        "timestamp": time_stamp
    }
    print("working...")
    req = session.post(
    BASE_URL + API_AUTH_UPDATE, json=_rdata,
    allow_redirects=True
    )
    req_dict = req.json()
    
    #return if the flag is true or false
    if req_dict['flag']:
        print(req_dict['personalInfo']['studentID'])
        text.set(req_dict['personalInfo']['studentID'])

    return req_dict['flag']

def scan_barcode(rfid_data):
    global text
    while(True):
        barcode_data = barcode.readline().decode('ASCII')
        if (len(barcode_data) > 0):
            print(barcode_data)
            if(barcode_data[0].isupper() and barcode_data[1:-1].isdigit() and barcode_data[-1]=="0"):
                time_stamp = get_timestamp()
                _data = {
                        "RFID": rfid_data,
                        "studentID": barcode_data[:-1], 
                        "timestamp": time_stamp
                    }
                req = session.post(
                BASE_URL + API_AUTH_REGISTER, json=_data,
                allow_redirects=True
                )
                print(req.json())
                return barcode_data[:-1]
            else:
                print("not student id")
                text.set("not student id")
                root.update_idletasks()
                root.update()
            

'''
while True:
    rfid_data = rfid.readline().decode('utf-8').replace(' ','').rstrip()
    if (len(rfid_data) == 8 and rfid_data.isalnum() and rfid_data.isupper()):  
        if not sending_data(rfid_data):##new rfid
            print("new user,plz scan ur student id card")
            barcode_result = scan_barcode()
            print(barcode_result)
        else:
            pass
'''
def task():
    global text
    rfid_data = rfid.readline().decode('utf-8').replace(' ','').rstrip()
    if (len(rfid_data) == 8 and rfid_data.isalnum() and rfid_data.isupper()):  
        if not sending_data(rfid_data):##new rfid
            print("new user,plz scan ur student id card")
            
            text.set("new user,plz scan ur student id card")
            root.update_idletasks()
            root.update()
            
            barcode_result = scan_barcode(rfid_data)
            print(barcode_result)
            text.set(barcode_result)
        else:
            pass

# start of program
#================Connecting barcode scanner============

print("==========Connecting barcode scanner==========")
print()

port_num = 0
test_port = "/dev/ttyUSB" + str(port_num)
port = serial.Serial
counter = 0

while(True):
    try:
        print("Trying:", test_port)
        port = serial.Serial(test_port, baudrate = 9600, bytesize = 8, timeout = 0.05)
        check = identify(port)
        print("%s is a valid port" %(port.name))
        if(check):
            rfid = serial.Serial(test_port, baudrate = 9600, bytesize = 8, timeout = 0.05)
            print("======rfid connected=======")
            print()
        else:
            barcode = serial.Serial(test_port, baudrate = 9600, bytesize = 8, timeout = 0.05)        
            print("======barcode scanner connected=======")
            print()
        counter+=1
        port_num+=1
        test_port = "/dev/ttyUSB" + str(port_num)
        if(counter == 2):
            print("counter = 2")
            break
        print("port_num=%d" %(port_num))
    
    except serial.serialutil.SerialException:
        print("Bad port. Trying next port......")
        print()
        
        port_num += 1
        test_port = "/dev/ttyUSB" + str(port_num)

print()
#=================Barcode scanner connected=============
BASE_URL = 'http://140.112.174.222:1484'
API_AUTH_UPDATE = '/mks_access/update'
API_AUTH_REGISTER = '/mks_access/register'
session = requests.Session()

root = tk.Tk()
root.geometry('300x100')

text = tk.StringVar()
text.set("Hello World!")

label = tk.Label(root, textvariable = text)
label.pack()

while True:
    task()
    root.update_idletasks()
    root.update()


        
