const express = require('express');
const webpush = require('web-push');
const asyncHandler = require('express-async-handler');

const { getEmployees } = require('../model/employees');
require('dotenv').config();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:robert.baumgartner@htlwienwest.at', publicVapidKey, privateVapidKey);

const router = express.Router();

const subscription = [];

router.get(
  '/employees',
  asyncHandler(async (req, res) => {
    res.json(getEmployees());
  }),
);

router.post(
  '/subscribe',
  asyncHandler(async (req, res) => {
    subscription.push(req.body);
    res.status(201).end();
  }),
);

router.post('/notify', (req, res) => {
  const payload = JSON.stringify({ title: 'Push Test Hasanovic', body: req.body });
  for (const sub of subscription) {
    try {
      webpush.sendNotification(sub, payload);
    } catch (error) {
      console.log('##################');

      console.error(error);
    }
  }
  res.status(200).send('OK');
});

module.exports = router;
