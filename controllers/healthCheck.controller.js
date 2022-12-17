const mongoose = require('mongoose');

const healthCheck = (req, res) => {
  let healthcheck = {
    uptime: process.uptime(),
    message: "SERVER UP!",
    timestamp: Date.now()
  };
  const dbState = mongoose.STATES[mongoose.connection.readyState];
  healthcheck = { ...healthcheck, dbState };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
};

module.exports = {
  healthCheck
};
