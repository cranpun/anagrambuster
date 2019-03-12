FROM node

WORKDIR /root/

# RUN apt-get update; \
#     apt-get install -y fortune cowsay; \
#     apt-get clean;

# プログラムのコピー
COPY package-lock.json .
COPY package.json .
RUN mkdir ./src
COPY src ./src
RUN mkdir ./public
COPY public ./public

# インストール
RUN npm install --production

EXPOSE 80 443

# 実行
CMD node ./src/app.js
