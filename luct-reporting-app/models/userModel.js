const db = require('../db');

const createUser = async (user) => {
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, user.password, user.role]
    );
    return result;
};

const findUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const getUserById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const getAllUsers = async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
};

const deleteUser = async (id) => {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
};

module.exports = {
    createUser,
    findUserByEmail,
    getUserById,
    getAllUsers,
    deleteUser
};