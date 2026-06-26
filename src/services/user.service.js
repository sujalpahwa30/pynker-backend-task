const userModel = require("../models/user.model");
const AppError = require("../utils/AppError");

const followUser = ({ followerId, followingId }) => {
    if (followerId === followingId) {
        throw new AppError("You cannot follow yourself.", 400);
    }

    const targetUser = userModel.findUserById(followingId);

    if (!targetUser) {
        throw new AppError("User not found.", 404);
    }

    const existingFollow = userModel.isFollowing(
        followerId,
        followingId
    );

    if (existingFollow) {
        throw new AppError("Already following this user.", 409);
    }

    userModel.followUser(followerId, followingId);

    return {
        message: "User followed successfully."
    };
};

const unfollowUser = ({ followerId, followingId }) => {

    if (followerId === followingId) {
        throw new AppError("Invalid operation.", 400);
    }

    const targetUser = userModel.findUserById(followingId);

    if (!targetUser) {
        throw new AppError("User not found.", 404);
    }

    const relationship = userModel.isFollowing(
        followerId,
        followingId
    );

    if (!relationship) {
        throw new AppError("You are not following this user.", 404);
    }

    userModel.unfollowUser(
        followerId,
        followingId
    );

    return {
        message: "User unfollowed successfully."
    };
};

const getFollowers = (userId) => {

    const user = userModel.findUserById(userId);

    if (!user) {
        throw new AppError("User not found.",404);
    }

    const followers =
        userModel.getFollowers(userId);

    return {
        count: followers.length,
        followers
    };

};

module.exports = {
    followUser,
    unfollowUser,
    getFollowers
};