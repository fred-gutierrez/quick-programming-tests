const router = require("express").Router()

router.use("/skills", require("./api/skills"))

module.exports = router;
