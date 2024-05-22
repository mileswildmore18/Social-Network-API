require('mongoose').config();

const Mongoose = require('mongoose');

//connects with a dynamic PORT
const mongoose = process.env.DB_URL
? new Mongoose(process.env.DB_URL)
: new Mongoose(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

module.exports = mongoose;