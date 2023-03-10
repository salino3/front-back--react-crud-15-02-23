// npm i express nodemon cors
// npm i --save-dev @types/cors
// npm install --save mysql2
// npm install --save mysql
// npm install -g nodemon
// npm install dotenv

const express = require("express");
const cors = require('cors');
const { db } = require("./connection/db");
const dotenv = require('dotenv');
const router = require('./routes/users');


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// GET test
app.get('/', (req, res) => {
    res.json("Hello from backend!");
});

app.use('/users', router);

const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log("Server running on port " + port);
});