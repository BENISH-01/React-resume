import json

def create(mydb, req_data):
    sql = """INSERT INTO registertable(name,email,password,address,pin,phone,area,aadhar,city,cart,myorders) VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    input_data = (req_data.get('name'), req_data.get('email'),req_data.get('password'),req_data.get('address'),req_data.get('pin'),req_data.get('phone'),req_data.get('area'),req_data.get('aadhar'),req_data.get('city'),json.dumps(req_data.get('cart')),json.dumps(req_data.get('myorders')))
    cursor = mydb.cursor()
    cursor.execute(sql, input_data)
    mydb.commit()
    cursor.close()
    return "Record inserted successfully"