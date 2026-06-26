const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.post(
    "/:id/follow",
    authenticate,
    userController.followUser
);

router.delete(
    "/:id/follow",
    authenticate,
    userController.unfollowUser
);

router.get(
    "/:id/followers",
    userController.getFollowers
);

module.exports = router;