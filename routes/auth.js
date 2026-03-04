const { Router } = require("express");
const controller = require("../controllers/auth");

const router = Router();

router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", controller.postSignUp);

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/logout", controller.getLogout);

router.get("/membership", controller.getMembership);
router.post("/membership", controller.postMembership);

router.get("/admin", controller.getAdmin);
router.post("/admin", controller.postAdmin);

module.exports = router;
