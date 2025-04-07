const router = require("express").Router();

router.use("/skills", require("./api/skills"));
router.use("/questions", require("./api/questions"));

module.exports = router;
