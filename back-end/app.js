const express = require('express');
const model = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const PORT = require('./configuration.json').port;
const cors = require('cors')
//initializare express
const app = express();

dotenv.config();
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
 app.get('/Login/:id',function (request,response){
     response.send('am apelat GET /messages/'+ request.params.id);
 });
 app.post('/Login',function (request,response){
  console.log(request.body);
     response.send('Am apelat POST /messages');
 });
