import json
# login
def myorders(mydb,req_data):
    sql="""UPDATE registertable SET myorders=%s where email=%s """
    input_data=(json.dumps(req_data.get('myorders')),req_data.get('email'))
    cursor=mydb.cursor()
    cursor.execute(sql,input_data)
    mydb.commit()
    cursor.close()
    return "success"