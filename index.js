const express = require('express');
const bodyParser = require('body-parser');
const user = require('./api/user');
const system = require('./api/system');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/user', user);
app.use('/api/system', system);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
