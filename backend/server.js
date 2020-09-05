const express = require('express')
const cors = require ('cors')
const mongoose = require('mongoose')
// const paperRouter= require('./routes/paper.route')
const userRouter= require('./routes/user')

require('dotenv').config();

const app = express ()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection= mongoose.connection;
connection.once('open' ,() => {
    console.log("MongoDB connection established successfully")
})

app.use('/user', userRouter)
// app.use('/paper', paperRouter)


app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

