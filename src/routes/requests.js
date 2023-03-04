const router = require('express').Router();
const requestService = require('../services/requestService');
const isAuth = require('../middlewares/isAuth');

router.get("/", isAuth, async (req, res) => {
  const requests = await requestService.list();

  res.json(requests);
});

router.post("/", isAuth, async (req, res) => {
  const { userId } = req;
  const { products } = req.body;

  const request = await requestService.create({ userId, products });

  res.status(201).json({ message: `Request ${request.id} created!` })
});

router.patch("/:id", isAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await requestService.updateStatus(parseInt(id), status)

  res.json({ message: `Pedido ${id} atualizado para ${status}` })
})

module.exports = router;
