const router = require("express").Router();
const Skill = require("../../models/skill.model");

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.send(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
