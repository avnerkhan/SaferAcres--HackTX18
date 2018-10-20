import pprint
p = pprint
import urllib.request, json
import csv
import pandas as pd
from datetime import date

pp = pprint.PrettyPrinter(indent=4)
with urllib.request.urlopen("https://data.austintexas.gov/resource/mfej-x5pm.json") as url:
    data = json.loads(url.read().decode())
    #pp.pprint(data)


d0 = date(2003, 1, 1)


mat = []

for item in data:
    print(item)
    #x = input('x')
    try:
        [year, month, day] = item['occ_date'][:10].split('-')

        d1 = date(int(year), int(month), int(day))
        delta = d1 - d0
        days = delta.days
        nextRow = [days,item['location']['coordinates'][0],item['location']['coordinates'][1],item['crime_type']]
        #print(nextRow)
        mat.append(nextRow)
    except:
        pass

header = ['time','crime_location_lat','crime_location_long']

df = pd.DataFrame(mat, columns= header)
df = df.sort_values('time')
df.to_csv('trainingData.csv', index= False)
print(df)
