import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_USERNAME =  os.getenv('DB_USERNAME')
DB_HOST = os.getenv('DB_HOST')
mydb = mysql.connector.connect(user=DB_USERNAME, host=DB_HOST, passwd=DB_PASSWORD)
mycursor = mydb.cursor()
mycursor.execute('CREATE DATABASE IF NOT EXISTS communityshiur')
mycursor.execute('USE communityshiur')
mycursor.execute('CREATE TABLE IF NOT EXISTS shiurim (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), link VARCHAR(255), lecturer VARCHAR(255), sources VARCHAR(255), institution VARCHAR(255), date DATETIME NOT NULL DEFAULT "1970-01-01 00:00:00", dateCreated DATETIME NOT NULL DEFAULT NOW())')
