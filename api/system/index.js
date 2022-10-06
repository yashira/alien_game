const express = require('express');
const db = require('../../db');
const util = require('../../util');

const router = express.Router();
let client = null;
// eslint-disable-next-line consistent-return
router.get('/reset', async (req, res) => {
  try {
    const yaml = util.getConfig();
    // Delete existing collection
    client = db.getClient();
    client.connect((err) => {
      if (err) {
        console.log(err);
        res.status(400).send({
          error: true,
          message: 'Error occurred while connecting to database',
        });
      }
      client.db('alien-game').collection('users').deleteMany({}, (error, collection) => {
        if (error) {
          res.status(400).send({
            error: true,
            message: 'Error occurred while deleting users',
          });
          client.close();
        } else {
          const userArray = [];
          yaml.users.forEach((user) => {
            const userObject = {
              name: user.name,
              strength: user.strength,
              birthday: user.birthday,
              key: user.key,
              type: user.type,
            };
            userArray.push(userObject);
          });

          client.db('alien-game').collection('users').insertMany(userArray, (userAddError, userCollection) => {
            if (userAddError) {
              res.status(400).send({
                error: true,
                message: 'Error occurred while adding users',
              });
            } else {
              res.json({
                status: 201,
                message: `${userCollection.insertedCount} records inserted, reset successful`,
              }).status(201);
            }
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('server error');
  } finally {
    client.close();
  }
});

module.exports = router;
