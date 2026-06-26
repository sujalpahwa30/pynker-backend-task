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

const isFollowingStmt = db.prepare(`
    SELECT* FROM followers WHERE follower_id = ? AND following_id = ?;
`); 

const followUserStmt = db.prepare(`
    INSERT INTO followers (follower_id, following_id) VALUES (?, ?);
`);

const unfollowUserStmt = db.prepare(`
    DELETE FROM followers WHERE follower_id = ? AND following_id = ?;
`);

const getFollowersStmt = db.prepare(`
    SELECT users.id, users.name, users.email
    FROM followers JOIN users ON followers.follower_id = users.id
    WHERE followers.following_id = ?;
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

const isFollowing = (followerId, followingId) => {
    return isFollowingStmt.get(followerId, followingId); 
}; 

const followUser = (followerId, followingId) => {
    return followUserStmt.run(followerId, followingId); 
};

const unfollowUser = (followerId, followingId) => {
    return unfollowUserStmt.run(followerId, followingId); 
};

const getFollowers = (userId) => {
    return getFollowersStmt.all(userId); 
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    isFollowing,
    followUser, 
    unfollowUser,
    getFollowers, 
};