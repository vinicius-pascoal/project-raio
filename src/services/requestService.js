const db = require('../modules/db');
const { crypto } = require('../modules/hashPass');

async function create(user) {
  const { name, email, phone, password, address } = user;

  const hash = await crypto(password);

  const newUser = await db.user.create({ data: { name, address, email, password: hash, phone } })

  return newUser;
}

async function list() {
  const users = await db.user.findMany();

  return users;
}

async function remove(id) {
  await db.user.delete({ where: { id } })
}

module.exports = {
  create,
  list,
  remove,
};
