const express = require('express');
const model = require('./models');
<<<<<<< HEAD
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const PORT = require('./configuration.json').port;

=======
const PORT = 3000;
>>>>>>> master

const app = express()

dotenv.config();
//for json requests
<<<<<<< HEAD
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
=======
app.use(express.json());
>>>>>>> master

model.sequelize.sync();

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(PORT, ()=>{
  console.log(`App started on http://localhost:${PORT}`)
});
