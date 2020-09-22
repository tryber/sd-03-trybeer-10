const connection = require('./connection');

const login = async (email, password) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['email', 'password'])
        .values(email, password)
        .execute(),
    )
    .then((fetch) => fetch.fetchOne())
    .then(([email, password]) => { email, password })
};

module.exports = {
  login,
};
