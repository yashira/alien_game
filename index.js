const express = require('express');
const user = require('./api/user')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ extended: false }));

app.use('/api/user', user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
