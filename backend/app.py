#importing required python libraries
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from selenium import webdriver
from bs4 import BeautifulSoup
from itertools import islice
from webdriver_manager.chrome import ChromeDriverManager
from data.connection import query, insert, count, querySchool, countProgram, queryItem, query_groupByCompany
import pandas as pd
import json
import os
import csv
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET') # Change this!
jwt = JWTManager(app)
# make flask support CORS
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# testing API, you can try to access http://localhost:5000/ on your browser after starting the server
# params:
#   -name: string
@app.route("/")
@cross_origin()
def hello():
    name = request.args.get('name') if request.args.get('name') else ''
    obj = {
        "str": "Hello World!"+name
    }
    return jsonify(obj)

# saerch function
# params:
#   -keywords: string
@app.route("/search")
def search():
    keywords = request.args.get('keywords')
    keywords = keywords.replace(' ', '+')

    # create a url for a crawler to fetch job information
    url = "https://www.google.com/search?q=" + keywords + "&ibp=htl;jobs"

    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(url)
    content = driver.page_source
    driver.close()
    soup = BeautifulSoup(content)

    # parsing searching results to DataFrame and return
    df = pd.DataFrame(columns=["jobTitle", "companyName", "location"])
    mydivs = soup.find_all("div", {"class": "PwjeAc"})
    for i, div in enumerate(mydivs):
        df.at[i, "jobTitle"] = div.find("div", {"class": "BjJfJf PUpOsf"}).text
        df.at[i, "companyName"] = div.find("div", {"class": "vNEEBe"}).text
        df.at[i, "location"] = div.find("div", {"class": "Qk80Jf"}).text
    return jsonify(df.to_dict('records'))

# get data from the CSV file for rendering root page
@app.route("/application", methods=['GET'])
def getDataFromCSV():
    try:
        results = query()
        result = []
        for row in results:
            if (len(row) == 5):
                dic = {}
                dic['jobTitle'] = row[0]
                dic['companyName'] = row[1]
                dic['date'] = row[2].strftime("%Y-%m-%d")
                dic['class'] = str(row[3])
                dic['id'] = str(row[4])
                result.append(dic)
            
        json_str = json.dumps(result)
        return json_str
    except Exception as e: 
        print(e)
        exit(1)

@app.route("/applicationSummaryPage", methods=['GET'])
def getCompanySummaryPage():
    try:
        results = query_groupByCompany()
        result = []
        for row in results:
            if (len(row) == 4):
                dic = {}
                dic['companyName'] = row[0]
                dic['Waiting'] = row[1]
                dic['Offer'] = row[2]
                dic['Rejected'] = row[3]
                result.append(dic)

        # json_str = json.dumps(result)
        json_str = jsonify(result)
        return json_str
    except Exception as e:
        print(e)
        exit(1)

# write a new record to the CSV file 
@app.route("/application", methods=['POST'])
def editcsv():
    # todo: imply database
    csvTitle = ['jobTitle', 'companyName', 'date', 'class', 'id']
    tables = ['application', 'job']
    application = request.get_json()['application']
    data = {}
    for t in csvTitle:
        if (t is 'jobTitle'):
            data['jobName'] = application[t]
        if (t is 'companyName'):
            data['jobCompany'] = application[t]
        if (t is 'date'):
            data['jobReleaseDate'] = application[t]
            data['updateTime'] = application[t]
        if (t is 'class'):
            data['applyStatus'] = application[t]
            data['jobClass'] = application[t]
        if (t is 'id'):
            data['jobId'] = application[t]
        # newLine.append(application[t] if t in application else None)

    try:
        for table in tables:
            insert(table, data)

    except Exception as e: 
        print(e)
        exit(1)
    return jsonify('Create an application succeddfully!')

@app.route("/school", methods=['GET'])
def getDataFromDB():
    try:
        results = querySchool()
        result = []
        for row in results:
            if (len(row) == 5):
                dic = {}
                dic['programTitle'] = row[0]
                dic['schoolName'] = row[1]
                dic['date'] = row[2].strftime("%Y-%m-%d")
                dic['class'] = str(row[3])
                dic['id'] = str(row[4])
                result.append(dic)

        json_str = json.dumps(result)
        return json_str
    except Exception as e:
        print(e)
        exit(1)

# write a new record to the CSV file
@app.route("/school", methods=['POST'])
def editDB():
    # todo: imply database
    # path = "./data/applications.csv"
    csvTitle = ['programTitle', 'schoolName', 'date', 'class', 'id']
    tables = ['school', 'program']
    application = request.get_json()['school']
    data = {}
    for t in csvTitle:
        if (t is 'programTitle'):
            data['programName'] = application[t]
        if (t is 'schoolName'):
            data['programSchool'] = application[t]
        if (t is 'date'):
            data['jobReleaseDate'] = application[t]
            data['updateTime'] = application[t]
        if (t is 'class'):
            data['applyStatus'] = application[t]
            data['jobClass'] = application[t]
        if (t is 'id'):
            data['programId'] = application[t]
        # newLine.append(application[t] if t in application else None)

    try:
        for table in tables:
            insert(table, data)

    except Exception as e:
        print(e)
        exit(1)
    return jsonify('Create an school application succeddfully!')

@app.route("/note", methods=['GET'])
def getDataFromDB2():
    try:
        results = queryItem()
        result = []
        for row in results:
            if (len(row) == 5):
                dic = {}
                dic['jobName'] = row[0]
                dic['jobCompany'] = row[1]
                dic['commentTime'] = row[2].strftime("%Y-%m-%d")
                dic['class'] = str(row[3])
                dic['id'] = str(row[4])
                result.append(dic)

        json_str = json.dumps(result)
        return json_str
    except Exception as e:
        print(e)
        exit(1)

# get the biggest id in the CSV for creating a new application
@app.route("/getNewId", methods=['GET'])
def getNewId():
    try:
        i = count() + 1
        return jsonify(i)
    except Exception as e: 
        print(e)
        exit(1)

@app.route("/getNewProgramId", methods=['GET'])
def getNewProgramId():
    path = "./data/applications.csv"
    try:
        i = countProgram() + 1
        return jsonify(i)
    except Exception as e:
        print(e)
        exit(1)

@app.route("/token", methods=['POST'])
def create_token():
    # data = json.loads(request.get_data())
    # print(data)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if email != "test" or password != "test":
            return jsonify({"msg": "Bad username or password"}), 401
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

if __name__ == "__main__":
    app.run()
