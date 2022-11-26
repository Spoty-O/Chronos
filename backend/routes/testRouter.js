const Router = require("express");
const router = new Router();
const TestController = require("../controllers/testController");

router.get("/", TestController.test);
router.post("/", TestController.test);

module.exports = router;
