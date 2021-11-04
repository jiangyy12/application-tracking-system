import mysql.connector as conn
from mysql.connector import errorcode

Connection = conn.connect(
            host="127.0.0.1",
            port="3306",
            user="root",
            password="",
            database="applicationtrackingsystem"
        )
print("Connect to the local database outside method success!")

def connect():
    try:
        Connection = conn.connect(
            host="127.0.0.1",
            port="3306",
            user="root",
            password="",
            database="applicationtrackingsystem"
        )
        print("Connect to the local database success!")
        return Connection
    except conn.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)


def query():
    try:
        # Connection = connect()
        # try:
        #     with open('../database/SET_DATABASE.sql', 'r') as f:
        #         with Connection.cursor() as cursor:
        #             cursor.execute(f.read(), multi=True)
        #         Connection.commit()
        #     print("Sourcing .sql file succeed!")
        # except:
        #     print("Sourcing .sql file failed!")

        query = "SELECT jobName, jobCompany, updateTime, applyStatus, job.jobId " \
                "FROM job, users, application " \
                "WHERE users.userId=application.userId AND job.jobId=application.jobId;"
        cursor = Connection.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        for row in results:

            jobName = row[0]
            jobCompany = row[1]
            updateTime = row[2]
            applyStatus = row[3]
            jobId = row[4]

            print("jobName=%s, jobCompany=%s, updateTime=%s, applyStatus=%s, jobId=%s"
                  % (jobName, jobCompany, updateTime, applyStatus, jobId))

        return results


    except conn.Error as err:
        print("Query failed! Error number is: %s" %err.errno)

    Connection.close()

def count():
    try:
        query = "SELECT COUNT(*) FROM job;"
        cursor = Connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        for row in result:
            count = row[0] + 1

        return count

    except conn.Error as err:
        print("Query failed! Error number is: %s" % err.errno)



def insert(tableName, data):
    try:
        if (tableName == 'application'):
            query = "INSERT INTO application (userId, jobId, applyStatus, updateTime) " \
                "VALUES (%s, %s, %s, %s);"

            # Gaolin: Since there was no user management before, I temporarily use '123' as the userId when inserting application table.
            # todo: record real userId
            value = ('1', data['jobId'], data['applyStatus'], data['updateTime'])
            cursor = Connection.cursor()
            cursor.execute(query, value)
        elif (tableName == 'job'):
            query = "INSERT INTO job (jobId, jobName, jobCompany, jobReleaseDate, jobClass) " \
                    "VALUES (%s, %s, %s, %s, %s);"

            value = (data['jobId'], data['jobName'], data['jobCompany'], data['jobReleaseDate'], data['jobClass'])
            cursor = Connection.cursor()
            cursor.execute(query, value)

        Connection.commit()

        print("Insert table %s succeed!" % tableName)

    except:
        print("Insert table %s failed!" % tableName)


query()
