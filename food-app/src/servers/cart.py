import json
# login
def cart(mydb,req_data):
    sql="""UPDATE registertable SET cart=%s where email=%s """
    input_data=(json.dumps(req_data.get('cart')),req_data.get('email'))
    cursor=mydb.cursor()
    cursor.execute(sql,input_data)
    mydb.commit()
    cursor.close()
    return "success"