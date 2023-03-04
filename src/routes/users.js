const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => {
  const list = await userService.list()

  res.json(list)
});

router.get('/:id', (req, res) => {

});

router.post('/', async (req, res) => {
  const { name, email, phone, password, address } = req.body;

  // TODO: Validate data

  const newUser = await userService.create({ name, email, phone, password, address });

  res.status(201).json({ message: `User ${newUser.id} created!` });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await userService.remove(parseInt(id));

  res.json({ message: `O usuario ${id} foi deletado com sucesso!` });
});

module.exports = router;
