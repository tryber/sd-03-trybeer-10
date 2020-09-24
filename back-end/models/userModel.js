const connection = require('./connection');

const login = async (Email) => (
  connection()
    .then((db) => db
      .getTable('users')
      .select(['name', 'email', 'password', 'role'])
      .where('email LIKE :email')
      .bind('email', Email)
      .execute())
    .then((fetch) => fetch.fetchOne())
    .then(([name, email, password, role]) => ({ name, email, password, role }))
);

const updateName = async (email, name) => (
  connection()
    .then((db) => db
      .getTable('users')
      .update()
      .set('name', name)
      .where('email = :email')
      .bind('email', email)
      .execute())
);

module.exports = {
  login,
  updateName,
};
