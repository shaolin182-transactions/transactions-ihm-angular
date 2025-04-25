FROM docker.io/node:23

RUN apt-get update && apt-get install -y curl chromium

RUN npm install -g @angular/cli

WORKDIR /app
ENV CHROME_BIN=/usr/bin/chromium \
    CHROME_PATH=/usr/lib/chromium/

USER node

