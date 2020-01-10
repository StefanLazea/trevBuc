const express = require('express');
const model = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = require('./configuration.json').port;
const cors = require('cors')

//initializare express
const app = express();

//for json requests
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors());
//sincronizare baza de date, in functie de modele
//in case we want to drop the tables:{ force: true }
model.sequelize.sync();
//model.sequelize.sync({ force: true });
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`)
});
