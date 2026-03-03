const { Router } = require("express");
const controller = require("../controllers/auth");

const router = Router();

router.get("/sign-up", controller.getSignUp);

module.exports = router;

