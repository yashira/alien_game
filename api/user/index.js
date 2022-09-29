const express = require('express');

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

module.exports = router;
