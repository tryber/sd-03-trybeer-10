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
    .then((result) => {
      if (!result) return null;
      const [ name, email, password, role ] = result;
      return { name, email, password, role };
    })
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
