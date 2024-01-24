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


