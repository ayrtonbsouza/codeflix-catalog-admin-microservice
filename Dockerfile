FROM node:14.18.3-slim

USER node

WORKDIR /home/node/app

CMD [ "sh" , "-c" , "yarn && tail -f /dev/null" ]
