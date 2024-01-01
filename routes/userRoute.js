const express = require ("express");
const router = express.Router();
const controller = require ("../controller/userController");
const { requireLoggedIn } = require("../middleware/authMiddle");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get('/user-auth',requireLoggedIn,(req ,res)=>{
    res.status(200).send({ok: true})
})

module.exports = router;