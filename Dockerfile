FROM node:14.18.3-slim

RUN apt update && apt install -y --no-install-recommends \
  git \
  && apt install -y --no-install-recommends ca-certificates \
  && apt install -y --no-install-recommends openssh-client

USER node

WORKDIR /home/node/app

CMD [ "sh" , "-c" , "yarn && tail -f /dev/null" ]
