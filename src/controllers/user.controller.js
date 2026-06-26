const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");

const followUser = asyncHandler(async (req,res)=>{
    const result = userService.followUser({
        followerId: req.user.id,
        followingId: Number(req.params.id)
    });
    return res.status(200).json({
        success:true,
        ...result
    });
});

const unfollowUser = asyncHandler(async (req,res)=>{
    const result = userService.unfollowUser({
        followerId: req.user.id,
        followingId: Number(req.params.id)
    });
    return res.status(200).json({
        success:true,
        ...result
    });
});

const getFollowers = asyncHandler(async (req,res)=>{
    const result = userService.getFollowers(
        Number(req.params.id)
    );
    return res.status(200).json({
        success:true,
        data:result
    });
});

module.exports = {
    followUser,
    unfollowUser,
    getFollowers
};