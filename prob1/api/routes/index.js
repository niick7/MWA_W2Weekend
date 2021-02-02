const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games-controller");
const usersController = require("../controllers/users-controller");

router.route("/games").get(gamesController.getGames);
router.route("/games/:gameId").get(gamesController.getGame);

router.route("/users/register").get(usersController.register);
router.route("/users/login").get(usersController.login);

module.exports = router;