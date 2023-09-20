const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()

require('dotenv').config()

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.use(express.json())

const routerTask = require('./src/routes/taskRoutes')

app.use('/task', routerTask)

const routerUser = require('./src/routes/userRoutes')

app.use('/user', routerUser)

const PORT = process.env.port || 3000;

const mongoDBURL = process.env.MONGODB_URL;

mongoose.connect(mongoDBURL)
.then(() => {
  console.log('Conectados ao mongoDB')
  app.listen(PORT)
})
.catch((err) => console.log(err))