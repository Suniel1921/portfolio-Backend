const express = require ("express");
const router = express.Router();
const controller = require ("../controller/contactController");

router.post("/contactwithme", controller.userContact);




module.exports = router;