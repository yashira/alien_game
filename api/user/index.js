const express = require('express');
const db = require('../../db');

const router = express.Router();
// eslint-disable-next-line consistent-return
router.get('/', async (req, res) => {
  try {
    res.json({
      status: 200,
      message: 'Get operation is success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('server error');
  }
});

/**
 * Creating users initially
 */
router.post('/create', async (req, res) => {
  try {
    const { username, uniqueId, energyLevel } = req.body;
    const { key } = req.headers;

    console.log(key);

    const user = {
      username,
      uniqueId,
      energyLevel,
      type: '',
    };

    const client = db.getClient();
    client.connect((err) => {
      if (err) {
        console.log(err);
        res.status(400).send({
          error: true,
          message: 'Error occurred while connecting to database',
        });
      }
      client.db('alien-game').collection('users').insertOne(user, (error, result) => {
        if (error) {
          res.status(400).send({
            error: true,
            message: 'Error occurred while inserting data',
          });
          client.close();
        } else {
          res.json({
            status: 201,
            message: 'User imported successfully',
          }).status(201);
          client.close();
        }
      });
    });
  } catch (error) {
    console.error('Error occurred during the operation');
    console.log(error);
  }
});

router.get('/register/:uniqueKey', (req, res) => {

});

module.exports = router;
