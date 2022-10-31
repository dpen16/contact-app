# Contact Manager Node Js Server

## Setup Node Js Server

- run command "npm install"
- since we are using sequelize to connect database, install sequelize cli using below command: npm install -g sequelize-cli
- create database contactmanager in mysql.
- change username and password in two places: config/config.json and src/database/connection.js
- migrate database table using sequelize command "sequelize db:migrate"
- seed default data using sequelize seeder command "sequelize db:seed:all"
- now run the server "npm run dev"