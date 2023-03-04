const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.post('/', async (req, res) => {
  const { name, email, phone, password, address } = req.body;

  // TODO: Validate data

  const newUser = await userService.create({ name, email, phone, password, address });

  res.status(201).json({ message: `User ${newUser.id} created!` });
});

router.delete('/:id', (req, res) => {

});

module.exports = router;
