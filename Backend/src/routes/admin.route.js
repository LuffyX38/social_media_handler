const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middleware/auth");

router.route("/register").post(adminController.register);
router.route("/login").post(adminController.login);
router.route("/logout").get(auth.verifyJWT,adminController.logout);
router.route("/my-profile").get(auth.verifyJWT,adminController.getMe);

module.exports = router;