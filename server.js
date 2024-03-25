const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const productRoute = require('./routes/userRoutes.js');


const app = express();

port = process.env.port || 5001
URI = process.env.MONGO_DB

app.use('/api/contacts', productRoute)

mongoose.connect(URI)
.then(()=>{
    console.log("DB connected Successfully");
    app.listen(port,()=>{
        console.log(`Server running on Port: ${port}`)
    })
}).catch(()=>{
    console.log("Connection Failed")
})