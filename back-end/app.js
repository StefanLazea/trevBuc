const express = require('express');
const model = require('./models');
const PORT = 3000;

const app = express()

//for json requests
app.use(express.json());

model.sequelize.sync();

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(PORT, ()=>{
  console.log(`App started on http://localhost:${PORT}`)
});
