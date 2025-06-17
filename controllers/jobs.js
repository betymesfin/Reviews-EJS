const Job = require("../models/Jobs");
//const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
  res.render("jobs", { jobs, csrfToken: req.csrfToken() });
};
const getJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!job) throw new NotFoundError(`No job with id ${req.params.id}`);
  res.render("job", { job, csrfToken: req.csrfToken() });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;
  await Job.create(req.body);
  res.redirect("/jobs");
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    throw new BadRequestError("Fields cannot be empty");
  await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  res.redirect("/jobs");
};

const deleteJob = async (req, res) => {
  await Job.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  res.redirect("/jobs");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
