const router = require('express').Router();
const userService = require('../services/productService');
const isAuth = require('../middlewares/isAuth');

// router.use(isAuth)

router.get('/', isAuth, async (req, res) => {
  const list = await userService.list()

  res.json(list)
});

router.get('/:id', isAuth, (req, res) => {

});

router.post('/', isAuth, async (req, res) => {
  const { name, price } = req.body;

  // TODO: Validate data

  const newUser = await userService.create({ name, price });

  res.status(201).json({ message: `Product ${newUser.id} created!` });
});

router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  await userService.remove(parseInt(id));

  res.json({ message: `Produto ${id} removido com sucesso` });
});

module.exports = router;
