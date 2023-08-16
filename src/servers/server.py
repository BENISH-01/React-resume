

import mysql.connector
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from login import login
from create import create
from read import read
from cart import cart
from myorders import myorders



db=mysql.connector.connect(host="localhost",user='root',password='root',database='foodapp', auth_plugin="mysql_native_password")

mycursor=db.cursor()

mycursor.execute("CREATE DATABASE IF NOT EXISTS foodapp")

mycursor.execute("CREATE TABLE IF NOT EXISTS registertable(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(25),email VARCHAR(25) NOT NULL, password VARCHAR(25),address VARCHAR(25),pin INT(25),phone INT(15),area VARCHAR(25),aadhar INT(25),city VARCHAR(25),cart json,UNIQUE(email))")
mycursor.execute("CREATE TABLE IF NOT EXISTS foodtable(id INT AUTO_INCREMENT PRIMARY KEY, hotel_name VARCHAR(100), food_name VARCHAR(100), image VARCHAR(500), cost VARCHAR(100),category VARCHAR(50),type VARCHAR(50),rate INT(10) ) ")
mycursor.execute("CREATE TABLE IF NOT EXISTS foods (id INT AUTO_INCREMENT PRIMARY KEY,items VARCHAR(10000))")
# mycursor.execute("ALTER TABLE registertable ADD  cart VARCHAR(10000)")
# mycursor.execute("DROP TABLE registertable")
# mycursor.execute("ALTER TABLE registertable ADD  myorders json AFTER cart")





all="""INSERT INTO foods (items) VALUES (%s)"""
val=[
         {
              "id":1, 
             "hotel_name":"KFC",
             "food_name":"Chicken Buckets",
             "image":"https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT86.jpg?ver=20.94",
            
             "cost":"₹400",
             "type":"Non Veg",
             "category":"Lunch",
             "rate":400
         },
         {
              "id":2,
             "hotel_name":"KFC",
             "food_name":"Box Meals",
             "image":"https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT158.jpg?ver=20.94",
             "cost":"₹300",
             "type":"Non Veg",
             "category":"Dinner",
             "rate":300
         },
         {
             "id":3,
            "hotel_name":"KFC",
            "food_name":"Snacks",
            "image":"https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT89.jpg?ver=22.28",
            "cost":"₹200",
             "type":"Non Veg",
             "category":"Break Fast",
             "rate":200

         },
         {
             "id":4,
            "hotel_name":"Pizza Hut",
             "food_name":"Chicken Pizza",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/dwhcj8f5zoh0pze32dsx",
             "cost":"₹200",
             "type":"Non Veg",
             "category":"Dinner",
             "rate":200
         },
         {
            "id":5,
            "hotel_name":"Pizza Hut",
             "food_name":"Burger",
             "image":"https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT99.jpg?ver=20.94",
             "cost":"₹200",
             "type":"Veg",
             "category":"Breakfast",
             "rate":200

         },
         {
            "id":6,
            "hotel_name":"Pizza Hut",
             "food_name":"Cheese Pizza",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/souiieye4fbhw1rxsvm6",
             "cost":"₹250",
             "type":"Veg",
             "category":"Dinner",
             "rate":250     

         },
         {
            "id":7,
            "hotel_name":"Dindugul Thalapakatti",
             "food_name":"Chicken Biriyani",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/v056wkr3zehgrn0hmlwm",
             "cost":"₹150",
             "type":"Non Veg",
             "category":"lunch",
             "rate":150
         },
         {
            "id":8,
            "hotel_name":"Dindugul Thalapakatti",
             "food_name":"Noodles",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/p6w1wag83eaokhkq5emh",
             "cost":"₹120",
             "type":"Veg",
             "category":"Dinner",
             "rate":120

         },
         {
            "id":9,
            "hotel_name":"Dindugul Thalapakatti",
             "food_name":"Dosa",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/tv90x6ikreum7qpr3mub",
             "cost":"₹50",
             "type":"Veg",
             "category":"Dinner",
             "rate":50

         },
         {
            "id":10,
            "hotel_name":"Hotel Ariya Bhavan",
             "food_name":"Idiyapam",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/esocaovtqclcl4k4zwcq",
             "cost":"₹100",
             "type":"Veg",
             "category":"Breakfast",
             "rate":100
         },
         {
            "id":11,
            "hotel_name":"Hotel Ariya Bhavan",
             "food_name":"Meals",
             "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ybgcdlchbwmiqtfdh4ez",
             "cost":"₹110",
             "type":"Veg",
             "category":"Lunch",
             "rate":110

         },
         {
             "id":12,
            "hotel_name":"Hotel Ariya Bhavan",
            "food_name":"Chapathi",
            "image":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/stdoh0rpkezcfbc1sx6o",
            "cost":"₹80",
            "type":"Veg",
            "category":"Break Fast",
            "rate":80
         }
 ]
# value=json.dumps(val)
# mycursor.execute(all , (value,))
# db.commit()



# to delete cart
def deletecart(mydb, req_data):
    sql = """UPDATE registertable SET cart=JSON_REMOVE(cart,'$[%s]') where email=%s"""
    input_data = (req_data.get('index'),req_data.get('email'))
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(sql, input_data)
    mydb.commit()
    cursor.close()
    return "Record deleted successfull"

# get cart
def getcart(mydb,req_data):
    sql = """SELECT cart from registertable where email=%s  """
    input_data=(req_data.get('email'),)
    cursor = mydb.cursor(dictionary = True)
    cursor.execute(sql,input_data)
    results = json.dumps(cursor.fetchone())
    cursor.close()
    return results






class GetHandler(BaseHTTPRequestHandler):
    def do_GET(self):

        if self.path == '/read':

            try:
                if db.is_connected():
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call read function from read file
                    self.wfile.write(bytes(read(db), "utf-8"))

            except mysql.connector.Error as error:

                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))
        
       
        
        

    def do_POST(self):
        # create register
        if self.path == '/create':
            try:
                if db.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    # call create function from create file
                    self.wfile.write(bytes(create(db, req_data), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))
        

        elif self.path == '/login':
            try:
                if db.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    # call create function from create file
                    self.wfile.write(bytes(login(db, req_data), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))
        
        elif self.path == '/cart':
            try:
                if db.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    # call create function from create file
                    self.wfile.write(bytes(cart(db, req_data), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))
    

        
        elif self.path == '/getcart':

            try:
                if db.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call read function from read file
                    self.wfile.write(bytes(getcart(db,req_data), "utf-8"))

            except mysql.connector.Error as error:

                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))
        
        elif self.path == '/deletecart':
             if db.is_connected():
                try:
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    # call create function from create file
                    self.wfile.write(bytes(deletecart(db, req_data), "utf-8"))

                except mysql.connector.Error as error:
                    self.send_response(200)
                    self.end_headers()
                    self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

        elif self.path == '/myorders':
            try:
                if db.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    # call create function from create file
                    self.wfile.write(bytes(myorders(db, req_data), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))   


        # elif self.path == '/delete':

        #     try:
        #         if db.is_connected():
        #             content_length = int(self.headers.get("Content-Length"))
        #             body = self.rfile.read(content_length)
        #             req_data = json.loads(body)
        #             self.send_response(200)
        #             self.send_header('Access-Control-Allow-Origin', '*')
        #             self.end_headers()
        #             # call delete function from delete file
        #             self.wfile.write(bytes(delete(db, req_data), "utf-8"))

        #     except mysql.connector.Error as error:

        #         self.send_response(200)
        #         self.end_headers()
        #         self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))




def main():
    httpd = HTTPServer(('localhost', 13000), GetHandler)
    print("Web server has been started")
    httpd.serve_forever()




if __name__ == "__main__":
    main()