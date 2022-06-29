const db = require('./connection');

const usersModel = {
  getAll: async () => {
    const sql = 'SELECT * FROM users';
    const [users] = await db.query(sql);
    return users;
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [[user]] = await db.query(sql, [id]);
    return user;
  },

  checkIfExistsId: async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [[exists]] = await db.query(sql, [id]);
    return !!exists;
  },
};

module.exports = usersModel;