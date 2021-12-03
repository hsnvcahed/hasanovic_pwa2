const express = require('express');
const asyncHandler = require('express-async-handler');

const { getEmployees } = require('../model/employees');

const router = express.Router();

router.get(
  '/employees',
  asyncHandler(async (req, res) => {
    res.json(getEmployees());
  }),
);

module.exports = router;
