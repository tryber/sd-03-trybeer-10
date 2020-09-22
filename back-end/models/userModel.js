const connection = require('./connection');

const login = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['name', 'email', 'password', 'role'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((fetch) => fetch.fetchOne())
    .then(([name, email, password, role]) => { name, email, password, role })
};

module.exports = {
  login,
};
