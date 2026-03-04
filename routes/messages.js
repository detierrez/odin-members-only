const { Router } = require("express");
const controller = require("../controllers/messages");

const router = Router();

router.get("/new", controller.getNewMessage);
router.post("/new", controller.postNewMessage);
router.delete("/", controller.deleteMessage);

module.exports = router;