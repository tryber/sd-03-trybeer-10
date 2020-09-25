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
      const [name, email, password, role] = result;
      return { name, email, password, role };
    })
);

const register = async (name, email, password, role) => (
  connection()
    .then((db) => db
      .getTable('users')
      .insert(['name', 'email', 'password', 'role'])
      .values(name, email, password, role)
      .execute())
);

module.exports = {
  login,
  register,
};
