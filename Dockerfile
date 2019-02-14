FROM node:11

ENV PORT 8081

EXPOSE 8081

COPY package.json package.json
RUN npm install 

COPY . .
RUN npm run build

CMD ["node", "dist/"]