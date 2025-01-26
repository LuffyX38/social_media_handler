const router = require("express").Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");

router.route("/").get(userController.showUsers);
router.route("/create-user").post(upload.array("images"),userController.createUser);
router.route("/show-users").get(auth.verifyJWT,userController.showUsers);

// router.rout

module.exports = router;