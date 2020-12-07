const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const evidenceRouter= require('./routes/evidence');
const userRouter= require('./routes/user');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(bodyParser.json());
app.use(cookieParser());


const uri= process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection= mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

if (process.env.NODE_ENV === 'production') {
  // Serve Static Files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Route all requests to client router
  app.get('/', function(_, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}


app.use('/user', userRouter);
app.use('/evidence', evidenceRouter);
app.use('/auth', authRouter);

app.listen(port, '0.0.0.0',() => {
  console.log(`server running on port ${port}`);
});

