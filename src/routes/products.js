const router = require('express').Router();
const userService = require('../services/productsService');

router.get('/', async (req, res) => {
  const list = await userService.list()

  res.json(list)
});

router.get('/:id', (req, res) => {

});

router.post('/', async (req, res) => {
  const { name, price } = req.body;

  // TODO: Validate data

  const newUser = await userService.create({ name, price });

  res.status(201).json({ message: `Product ${newUser.id} created!` });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await userService.remove(parseInt(id));

  res.json({ message: `Produto ${id} removido com sucesso` });
});

module.exports = router;
