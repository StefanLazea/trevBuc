const express = require('express');
const model = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const PORT = require('./configuration.json').port;

//initializare express
const app = express();

dotenv.config();
//for json requests
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//sincronizare baza de date, in functie de modele
model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`)
});
 app.get('/Login/:id',function (request,response){
     response.send('am apelat GET /messages/'+ request.params.id);
 });
 app.post('/Login',function (request,response){
  console.log(request.body);
     response.send('Am apelat POST /messages');
 });
