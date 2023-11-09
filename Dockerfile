# Stage 1: Build the React app
FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]