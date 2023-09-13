const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello Teste'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cvmub6j.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
  console.log('Conectados ao mongoDB')
  app.listen(3000)
})
.catch((err) => console.log(err))