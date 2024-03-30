const express = require('express');
require('dotenv').config();
const contactRoute = require('./routes/contactRoutes.js');
const connectDb = require('./config/dbConnection.js');
const errorHandler = require('./middleware/errorHandler.js')
const userRoute = require('./routes/userRoutes.js');


connectDb();
const app = express();
port = process.env.port || 5001
app.use(express.json());
app.use('/api/contacts', contactRoute);
app.use('/api/users',userRoute);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on Port: ${port}`)
});
