#!/usr/bin/env python


import requests
import json
import pyodbc

class Test(object):

    def get_server_info(self):
        url = "https://management.azure.com/subscriptions/2571f3fc-64e6-46cd-9f64-298fc4372dfa/resourceGroups/apd_data/providers/Microsoft.Sql/servers/saferacres"

        # URI Parameters
        parameters = {'api-version': '2015-05-01-preview'}
        headers = {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSIsImtpZCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83YzI1Mzk3Yi01YzdlLTQxMjctODRiYS1lOTJjNWE3MWYyODAvIiwiaWF0IjoxNTQwMDU2ODQwLCJuYmYiOjE1NDAwNTY4NDAsImV4cCI6MTU0MDA2MDc0MCwiYWNyIjoiMSIsImFpbyI6IjQyUmdZSmlyR3FqbW5HdllkYW5wOXNyLzZ4eXp6U2JrbVcxM1BwL2QxOWo3MVdTclF3MEEiLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwMzAwMDAxODc1N0NCOCIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI3ZjU5YTc3My0yZWFmLTQyOWMtYTA1OS01MGZjNWJiMjhiNDQiLCJhcHBpZGFjciI6IjIiLCJlX2V4cCI6MjYyODAwLCJlbWFpbCI6InNhZmVyYWNyZXNAb3V0bG9vay5jb20iLCJmYW1pbHlfbmFtZSI6IkFjcmVzIiwiZ2l2ZW5fbmFtZSI6IlNhZmUiLCJncm91cHMiOlsiODU3OGU5M2EtZWFkMy00YjkxLTlmZGEtY2ZhOWFjMTY0Y2YwIl0sImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiMTI4LjYyLjU5LjgzIiwibmFtZSI6IlNhZmUgQWNyZXMiLCJvaWQiOiI3ODAzNWEwZi03MmFlLTQ1ODYtYmNhNy1iYzE1NWYwNzJmMzQiLCJwdWlkIjoiMTAwM0JGRkRBRUM0QTE3RiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IkhUQ085NTBjY1p2a1U5ME9TSGVPb2dlZl9TajBvaTR6SnppNkJNZjdaMFUiLCJ0aWQiOiI3YzI1Mzk3Yi01YzdlLTQxMjctODRiYS1lOTJjNWE3MWYyODAiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI3NhZmVyYWNyZXNAb3V0bG9vay5jb20iLCJ1dGkiOiJvM3lsSWFpSEkwYVZfREt1dUsxekFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXX0.MGTPVeAtNLFB3aIn9XpwonYVKysWxClMr9I79L3FBuQ8DUoLcgHACDuNMPssF9wQ1fafLH5wN4sjC6G3iCICoGLKxvktedJ2Idehdg35aeOJtjdMVyU-qR4EUe3lMgXZRF_hRZ0jI21QCASP3xQpEpPFJh67Owsu9X2ec3EkNvAXDlfLtA1AMJ0V8RDjPd22hqB10UFAcOhdSfCpJHjL8tNUXM-wOieJgfAWpwJbr03QdRnHJPJIbGbpQihRDkTLivzcdnr5BNdo3z1A42k3tSDHFjXAXCNHGWpe-86ai7xX3UEuSsZQwXzLJXQQQVHZi6MgIakYLAQebAMnsikSHg"
        }

        # Gets server information
        response = requests.get(url, params = parameters, headers = headers)
        print("Response: {}".format(response.text))

    def get_db_info(self):
        url = "https://management.azure.com/subscriptions/2571f3fc-64e6-46cd-9f64-298fc4372dfa/resourceGroups/apd_data/providers/Microsoft.Sql/servers/saferacres/databases/apd"

        parameters = {'api-version': "2017-10-01-preview"}

        headers = {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSIsImtpZCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83YzI1Mzk3Yi01YzdlLTQxMjctODRiYS1lOTJjNWE3MWYyODAvIiwiaWF0IjoxNTQwMDU3Mjg4LCJuYmYiOjE1NDAwNTcyODgsImV4cCI6MTU0MDA2MTE4OCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhKQUFBQU5MemJsOUpycERFVjI0c3VLRGdZNUI4MUpLRzNtV2dWSHBXdjNqNmhGTDA9IiwiYWx0c2VjaWQiOiIxOmxpdmUuY29tOjAwMDMwMDAwMTg3NTdDQjgiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiN2Y1OWE3NzMtMmVhZi00MjljLWEwNTktNTBmYzViYjI4YjQ0IiwiYXBwaWRhY3IiOiIyIiwiZV9leHAiOjI2MjgwMCwiZW1haWwiOiJzYWZlcmFjcmVzQG91dGxvb2suY29tIiwiZmFtaWx5X25hbWUiOiJBY3JlcyIsImdpdmVuX25hbWUiOiJTYWZlIiwiZ3JvdXBzIjpbIjg1NzhlOTNhLWVhZDMtNGI5MS05ZmRhLWNmYTlhYzE2NGNmMCJdLCJpZHAiOiJsaXZlLmNvbSIsImlwYWRkciI6IjEyOC42Mi41OS44MyIsIm5hbWUiOiJTYWZlIEFjcmVzIiwib2lkIjoiNzgwMzVhMGYtNzJhZS00NTg2LWJjYTctYmMxNTVmMDcyZjM0IiwicHVpZCI6IjEwMDNCRkZEQUVDNEExN0YiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJIVENPOTUwY2NadmtVOTBPU0hlT29nZWZfU2owb2k0ekp6aTZCTWY3WjBVIiwidGlkIjoiN2MyNTM5N2ItNWM3ZS00MTI3LTg0YmEtZTkyYzVhNzFmMjgwIiwidW5pcXVlX25hbWUiOiJsaXZlLmNvbSNzYWZlcmFjcmVzQG91dGxvb2suY29tIiwidXRpIjoiQWE5QjVFOUdoMDJNbkt0NENEVlRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIl19.F6yfR-S8i2BpnijLRQB6_Qmd_v_hD4CfwXA2He46FXpGwX4lwUV1p_cwGUPYN6tYMwHR928494M-1fN4EuNmNWSqhTv1aw-CYf_ek4knx_ZcuRAcNrvqL4SqHi251dHSe3a2ipHxfwP4nJonnrL2L0EDoFquyqigyW9qGq-NU9fDVjHDsVzoz9FCFXwSM_seg-u7KWVW0tdjDvfYNlxHyhF4Bk4dZoxaEkwDxN1hYeqAuyGL1F6um1c-NEVKG-sUS8OWYYhxYrLsf2Dwm8yMMNyCkLNjem3ZNWJW-gxgZSu1gnDn3rr92wlNKLMPuerv5QjwxJmKlxGCPCbic27B4g"
        }
        response = requests.get(url, params = parameters, headers = headers)
        print("Response status code: {}\n".format(response.status_code))
        response_json = response.json()
        print("Database info: {}\n".format(response_json))

    def query_db(self):
        # Set query parameters
        server = 'saferacres.database.windows.net'
        database = 'apd'
        username = 'saferacres'
        password = 'Yeetman123'
        driver= '{ODBC Driver 13 for SQL Server}'

        # Establish connection to SQL db in Azure cloud
        cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = cnxn.cursor()

        query = "SELECT COUNT(*) FROM test"
        cursor.execute(query)
        res = cursor.fetchone()
        if res:
            print("Count in db: {}\n".format(res[0]))


if __name__ == "__main__":
    app = Test()
    app.query_db()
