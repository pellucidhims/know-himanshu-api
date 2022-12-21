require("dotenv").config();
const NodeCache = require( "node-cache" );

const nodeCache = new NodeCache({stdTTL: 3600});
// const Twilio = require('twilio');
// const bcrypt = require('bcrypt');

// const twilioClient = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const createError = (message = "", httpStatusCode = 404) => {
  const err = new Error(message ? `${message}` : undefined);
  err.httpStatusCode = httpStatusCode;
  return err;
};

const logger = (messageString = "Logging message", messageObject = {}) => {
  // eslint-disable-next-line
  console.log(
    `<<<Logging info>>> ${new Date()} => ${messageString} ${JSON.stringify(
      messageObject,
      null,
      "  "
    )}`
  );
};

// const getHash = (data, salt) => bcrypt.hash(data.toString(), salt);
// const checkHash = (data, hash) => bcrypt.compare(data, hash);
// const checkHash = (data) => data;

// const sendOTP = (contact) => {
//   const otp = Math.floor((Math.random() * 9000) + 1000);
//   twilioClient.messages.create({
//     body: `${process.env.OTP_MESSAGE}${otp}`,
//     to: `${process.env.COUNTRY_CODE}${contact}`,
//     from: process.env.TWILIO_NUMBER,
//   }).then((msg) => logger('Message Sent Successfully', msg.sid));
//   // return getHash(otp, 3);
//   return otp;
// };

const isNullUndefinedOrEmpty = (data) => {
  if (data == null || data === undefined || !Object.keys(data).length)
    return true;
  return false;
};

module.exports = {
  createError,
  logger,
  // getHash,
  // checkHash,
  // sendOTP,
  isNullUndefinedOrEmpty,
  nodeCache,
};
