const db = require('../modules/db');
const { crypto } = require('../modules/hashPass');

async function create(request) {
  const { userId, products } = request;

  const newRequest = await db.request.create({
    data: {
      user: { connect: { id: userId } },
      products: { connect: products.map((id) => { return { id } }) }
    }
  });

  return newRequest;
}

async function list() {
  const request = await db.request.findMany({ include: { products: true } });

  return request;
}

async function remove(id) {
  await db.request.delete({ where: { id } });
}

async function updateStatus(id, status) {
  const request = await db.request.update({ where: { id }, data: { status } });

  return request;
}

module.exports = {
  create,
  list,
  remove,
  updateStatus
}
