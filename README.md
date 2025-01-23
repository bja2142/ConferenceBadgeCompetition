# Conference Badge App

# To start, run:

```docker compose up```

## For TLS

Replace `example.com` with your domain in conf/nginx/https.conf, and in the commands below

```
sudo apt install certbot
sudo certbot certonly --standalone --preferred-challenges http -d example.com
cp /etc/letsencrypt/live/example.com/fullchain.pem conf/nginx/.
cp /etc/letsencrypt/live/clc.mil.dev/privkey.pem conf/nginx/.
cp docker-compose.yml docker-compose.plaintext.yml && cp docker-compose.tls.example.yml docker-compose.yml
docker compose up
```


### building database:

1) first create csv of the following form:

```
group,realname,nickname,token

```

Where group corresponds to a group name in `groups.json`, realname is kept local and offline, nickname
is the displayed name on the server scoreboad, and token is the unique token to be programmed into badges.

2) then convert CSV to json with:

```
import csv
import json

# Open the CSV file
with open('data.csv', 'r') as csv_file:
    # Create a CSV reader
    csv_reader = csv.DictReader(csv_file)

    # Create a list to store the JSON data
    json_data = []

    # Iterate over the CSV rows
    for row in csv_reader:
        # Append each row (as a dictionary) to the list
        json_data.append(row)

# Open the JSON file for writing
with open('badges.json', 'w') as json_file:
    # Dump the JSON data into the file with indentation
    json.dump(json_data, json_file, indent=4)
```


3) program your badges:

```
#copy badges.json to pending_records
cp badges.json pending_records

# program badges
python3 program-badges.py

# program all of the badges.

# save written badges serial numbers
cp written_records programmed-badges-$(date +%d%b%Y.%H:%M).json
```

Copy badges.json and groups.json to your server and start your app.