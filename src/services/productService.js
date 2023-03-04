const db = require('../modules/db');

async function create(product) {
  const { name, price } = product;

  const newProduct = await db.product.create({ data: { name, price } });

  return newProduct;
}

async function list() {
  const products = await db.product.findMany();

  return products;
}

async function remove(id) {
  await db.product.delete({ where: { id } })
}

module.exports = {
  create,
  list,
  remove,
};
