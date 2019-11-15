const express = require('express');
const model = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;

//initializare express
const app = express();

//for json requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//sincronizare baza de date, in functie de modele
model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, ()=>{
  console.log(`App started on http://localhost:${PORT}`)
});
