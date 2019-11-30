const express = require('express');
const model = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const PORT = 3000;

//initializare express
const app = express();

dotenv.config();
//for json requests
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

//sincronizare baza de date, in functie de modele
model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`)
});
