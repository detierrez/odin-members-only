const { Router } = require("express");
const controller = require("../controllers/auth");

const router = Router();

router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", controller.postSignUp);

router.get("/log-in", controller.getLogIn);
router.post("/log-in", controller.postLogIn);

router.get("/log-out", controller.getLogOut);

router.get("/membership", controller.getMembership);
router.post("/membership", controller.postMembership);

module.exports = router;
