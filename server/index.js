const express = require('express');
const cors = require('cors');
const connection = require('./Connection/Connection')
const Users = require('./Routes/Users')
const Notes = require('./Routes/Notes')
const Folders = require('./Routes/Folders')
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
require('dotenv').config();

connection()
let PORT = process.env.PORT || 5000
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Alternatively, if using express.json() directly
app.use(express.json({ limit: '10mb' }));

app.use('/users',Users)
app.use('/notes',Notes)
app.use('/folders',Folders)


app.listen(PORT,()=>{
    console.log(`Running on Port http://localhost:${PORT}`)
})