const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const { parseNums, getMean, getMedian, getMode } = require("./helpers");

app.get(`/mean`, (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError("Please pass in numbers.", 400);
    }
    const nums = parseNums(req.query.nums);
    let result = {
      operation: "mean",
      value: getMean(nums),
    };
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

app.get(`/median`, (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError("Please pass in numbers.", 400);
    }
    const nums = parseNums(req.query.nums);
    let result = {
      operation: "median",
      value: getMedian(nums),
    };
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

app.get(`/mode`, (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError("Please pass in numbers.", 400);
    }
    const nums = parseNums(req.query.nums);
    let result = {
      operation: "mode",
      value: getMode(nums),
    };
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// general 404 error handler
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

// global error handler
app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});
