FROM node:14.18.3-slim

RUN apt update && apt install -y --no-install-recommends \
  git \
  ca-certificates

USER node

WORKDIR /home/node/app

CMD [ "sh" , "-c" , "yarn && tail -f /dev/null" ]
