const router = require("express").Router();
const Questions = require("../../models/question.model");

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by skill and type
router.get("/:skill_id/:type", async (req, res) => {
  try {
    const questions = await Questions.find({
      skill_id: req.params.skill_id,
      type: req.params.type,
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by skill
router.get("/:skill_id", async (req, res) => {
  try {
    const questions = await Questions.find({
      skill_id: req.params.skill_id,
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
