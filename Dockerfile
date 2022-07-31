FROM node:14.18.3-slim

RUN mkdir -p /usr/share/man/man1 && \
  echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
  apt update && apt install -y \
  git \
  ca-certificates \
  openssh-client \
  openjdk-11-jre \
  zsh \
  curl \
  wget

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
  -t https://github.com/denysdovhan/spaceship-prompt \
  -p git \
  -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
  -p https://github.com/zsh-users/zsh-autosuggestions \
  -p https://github.com/zsh-users/zsh-completions \
  -a 'SPACESHIP_USER_SHOW=always' \
  -a 'SPACESHIP_PROMPT_ADD_NEWLINE=false' \
  -a 'SPACESHIP_CHAR_SYMBOL="❯"' \
  -a 'SPACESHIP_CHAR_SUFFIX=" "'

RUN bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"

CMD [ "sh" , "-c" , "yarn && tail -f /dev/null" ]
