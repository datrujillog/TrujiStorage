FROM node:latest


WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./src ./src/ 

EXPOSE 5000

RUN npx prisma init

COPY prisma ./prisma/

COPY .env .
# RUN npx prisma migrate dev --name init
RUN npx prisma generate

CMD ["npm", "run","dev"]   


