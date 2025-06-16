import requests
import socket
import time
import threading

EUREKA_SERVER = "http://eurekaserver:8761/eureka"  # địa chỉ Eureka Server
APP_NAME = "chatbotservice"
PORT = 8090
HOSTNAME = socket.gethostname()
IP_ADDR = socket.gethostbyname(HOSTNAME)

instance_id = f"{IP_ADDR}:{APP_NAME}:{PORT}"

headers = {
    "Content-Type": "application/json"
}

def register_to_eureka():
    payload = {
        "instance": {
            "instanceId": instance_id,
            "hostName": HOSTNAME,
            "app": APP_NAME.upper(),
            "ipAddr": IP_ADDR,
            "status": "UP",
            "port": {"$": PORT, "@enabled": "true"},
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            }
        }
    }
    url = f"{EUREKA_SERVER}/apps/{APP_NAME.upper()}"
    response = requests.post(url, json=payload, headers=headers)
    print(f"[Eureka] Register response: {response.status_code} - {response.text}")

def send_heartbeat():
    url = f"{EUREKA_SERVER}/apps/{APP_NAME.upper()}/{instance_id}"
    while True:
        time.sleep(10)
        response = requests.put(url, headers=headers)
        print(f"[Eureka] Heartbeat: {response.status_code}")

def start_eureka():
    register_to_eureka()
    threading.Thread(target=send_heartbeat, daemon=True).start()
