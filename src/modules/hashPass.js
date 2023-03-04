const bcrypt = require('bcrypt');

async function crypto(pwd) {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(pwd, salt);

  return password;
}

async function compare(pwd, hash) {
  const result = await bcrypt.compare(pwd, hash);

  return result;
}

module.exports = {
  crypto,
  compare
}
