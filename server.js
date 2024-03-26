const express = require('express');
require('dotenv').config();
const productRoute = require('./routes/userRoutes.js');
const connectDb = require('./config/dbConnection.js');
const errorHandler = require('./middleware/errorHandler.js')


connectDb();
const app = express();
port = process.env.port || 5001
app.use(express.json());
app.use('/api/contacts', productRoute)
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on Port: ${port}`)
});
