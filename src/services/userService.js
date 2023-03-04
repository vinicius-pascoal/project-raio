const jsonwebtoken = require('jsonwebtoken');
const db = require('../modules/db');
const { crypto, compare } = require('../modules/hashPass');

async function create(user) {
  const { name, email, phone, password, address } = user;

  const hash = await crypto(password);

  const newUser = await db.user.create({ data: { name, address, email, password: hash, phone } })

  return newUser;
}

async function login(user) {
  const { email, password } = user;

  const dbUser = await db.user.findUnique({ where: { email } });

  if (!dbUser || !(await compare(password, dbUser.password))) {
    throw new Error('Invalid email/password');
  }

  const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d', subject: `${dbUser.id}` });

  return token;
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
  login
};
