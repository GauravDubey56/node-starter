const express = require("express");
const router = express.Router();
const Controllers = require(_pathconst.FilesPath.Controllers)
router.get("/health", async (req, res) => {
  try {
    console.log("works fine");
    res.json({
      test: "works fine",
    });
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
    });
  }
});

module.exports = router;
