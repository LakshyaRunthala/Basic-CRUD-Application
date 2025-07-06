const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 8080
require('dotenv').config();
const itemsRoute = require('./routes/itemsroute')

const app = express()

app.use(express.json()) // middleware to parse JSON bodies

//Routes
app.use('/api/items',itemsRoute)

//MONGODB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Error:'+err));

app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`)
});






