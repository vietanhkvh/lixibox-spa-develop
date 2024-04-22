FROM alpine:3.8
LABEL maintainer='Son Dang <sondangdev@gmail.com>'

WORKDIR /home
RUN apk update && \
    apk add nodejs npm bash git coreutils
RUN npm install -g yarn

CMD /bin/bash
