const db = require("../config/database");

const findUserByEmailStmt = db.prepare(`
    SELECT* FROM users WHERE email = ?;
`);

const findUserbyIdStmt = db.prepare(`
    SELECT* FROM users WHERE id = ?;
`);

const createUserStmt = db.prepare(`
    INSERT INTO users (name, email, password) VALUES (?, ?, ?);
`);

const findUserByEmail = (email) => {
    return findUserByEmailStmt.get(email);
}

const findUserById = (id) => {
    return findUserbyIdStmt.get(id);
}

const createUser = ({ name, email, password }) => {
    return createUserStmt.run(
        name,
        email,
        password
    );
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};