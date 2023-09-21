const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
app.use(bodyParser.json())
const router = require('./app/Routes');

// for global config access
dotenv.config();
app.use(router)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})