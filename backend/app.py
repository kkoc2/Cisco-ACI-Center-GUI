from flask import Flask ,request

import requests , json , urllib3
from flask_cors import CORS

urllib3.disable_warnings()

def logout(token,ip):
    login_url = 'https://' + ip + '/api/aaaLogout.json'
    cookies = {}
    cookies['APIC-Cookie'] = token
    requests.get(login_url, cookies=cookies, verify=False)

def verify(token,apic_username,ip):
    login_url = 'https://' + ip + '/api/class/aaaUser.json'
    cookies = {}
    cookies['APIC-Cookie'] = token
    post_response = requests.get(login_url, cookies=cookies, verify=False)
    post_response_json = json.loads(post_response.text)
    verify_attributes = post_response_json['imdata'][0]['aaaUser']['attributes']

    if (verify_attributes['accountStatus'] != "active"):
        return { "error": true, "message": "Invalid token."}
    else:
        return {"ip":ip, "user" : apic_username , "token" : token }

def credentials(ip,apic_username, apic_password):
    login_url = 'https://' + ip + '/api/aaaLogin.json'
    credentials = {'aaaUser':
                   {'attributes':
                    {'name': apic_username, 'pwd': apic_password}
                    }
                   }
    json_credentials = json.dumps(credentials)
    post_response = requests.post(login_url, data=json_credentials, verify=False)
    post_response_json = json.loads(post_response.text)
    login_attributes = post_response_json['imdata'][0]['aaaLogin']['attributes']
    return {"ip":ip, "user" : apic_username , "token" : login_attributes['token'] }

app = Flask(__name__) # app değişkenizimizin Flask olduğunu belirttik.
CORS(app)

@app.route("/RestAPIAuth", methods=['POST'])
def RestAPIAuth():
    data = json.loads(request.data) 
    ip 	     = data['ip']
    username = data['username']
    password = data['password']
    return (credentials(ip,username,password))

@app.route("/RestAPIVerify", methods=['GET'])
def RestAPIVerify():
    token       = request.args.get('token')
    user       = request.args.get('user')
    ip       = request.args.get('ip')
    return (verify(token,user,ip))

@app.route("/RestAPIlogout", methods=['GET'])
def RestAPIlogout():
    token       = request.args.get('token')
    ip       = request.args.get('ip')
    logout(token,ip)
    return ('Kullanici Cikis Yapti')
