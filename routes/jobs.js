const express = require("express");

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);

router.get("/edit/:id", getJob); // To render the edit form
router.post("/update/:id", updateJob); // To submit the updated job
router.post("/delete/:id", deleteJob); // To delete a job
router.get("/new", (req, res) => {
  res.render("job", { job: null, csrfToken: req.csrfToken() });
});
  

module.exports = router;
