const express = require('express');
require('dotenv').config();
const dbConnect = require('./db/database');
const routes = require('./routes/user.route')

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server Started at ${PORT}`);
});

app.use('/api/v1', routes)

dbConnect();