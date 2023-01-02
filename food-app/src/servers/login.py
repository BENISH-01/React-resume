import json
# login
def login(mydb,req_data):
    sql="""SELECT * from registertable WHERE email=%s AND password=%s"""
    input_data=(req_data.get('email'),req_data.get('password'))
    cursor=mydb.cursor(dictionary=True)
    cursor.execute(sql,input_data)
    data={}
    result=cursor.fetchone()
    data["data"]=result
    data["status"]="success"
    results = json.dumps(data)
    cursor.close()
    return results