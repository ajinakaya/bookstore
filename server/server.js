const express = require('express');
const dotenv = require('dotenv').config()
const {mongoose} = require('mongoose')
const cors=require('cors');
const app=express();
const cookieParser= require('cookie-parser')



// database connection
mongoose.connect( process.env.MONGO_URL)
.then(()=>console.log('Database connected'))
.catch((err)=> console.log('Database not connected',err))

// middleware
app.use(express.json());
app.use(cookieParser());


app.use('/', require('./routes/authRoutes'))



const port =3001;
app.listen(port,() => console.log(`Server is running on port ${port}`))

