// const config = require("../util/config");
// const util = require('../util/util');

const logRequest = (req, res, next) => {
  // eslint-disable-next-line
  console.log(
    `**LOGGING REQUEST** @${new Date()} - `,
    " headers: ",
    req.headers,
    " body: ",
    req.body,
    " URL: ",
    req.url
  );
  next();
};

// Authentication middlewares
// Verify token
// const verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers.authorization;
//   if (bearerHeader !== undefined) {
//     // Authorization: Bearer <jwt_token> [This is how the auth token looks]
//     const bearerToken = bearerHeader.split(" ")[1];
//     if (bearerToken !== undefined) {
//       jwt.verify(bearerToken, encKeys.secretKey, (err, authData) => {
//         //eslint-disable-line
//         if (err) {
//           next(err);
//         }
//         req.authData = authData;
//         next();
//       });
//     } else {
//       const err = new Error("Forbidden. Authorization token missing");
//       err.httpStatusCode = 403;
//       next(err);
//     }
//   } else {
//     const err = new Error("Forbidden. Authorization token missing");
//     err.httpStatusCode = 403;
//     next(err);
//   }
// };

// Error handling middlewares
const handleError = (err, req, res, next) => {
  switch (err.httpStatusCode) {
    case 400:
      res.status(err.httpStatusCode).json({
        message: err.message || "Bad Request"
      });
      break;
    case 401:
    case 403:
      res.status(err.httpStatusCode).json({
        message: err.message || "Forbidden. Authorization token missing."
      });
      break;
    case 404:
      res.status(err.httpStatusCode).json({
        message: err.message || "Requested resource doesn't exist."
      });
      break;
    case 409:
      res.status(err.httpStatusCode).json({
        message: err.message || "Conflicting entry"
      });
      break;
    case 422:
      res.status(err.httpStatusCode).json({
        message: err.message || "Unprocessable Entity"
      });
      break;
    case 503:
      res.status(err.httpStatusCode).json({
        message: err.message || "Server busy. Please try again after some time."
      });
      break;
    default:
      res
        .status(500)
        .json(
          err || { message: "An unknown error occured on the server side" }
        );
      next();
  }
};

// exports.decryptRequest = (req,res,next) => {
//   if(req.body.encryptedRequest){
//     const encodedURIString = req.body.encryptedRequest
//     const decodedURIString = decodeURIComponent(encodedURIString)
//     let decryptedPayload = utils.getDecryptedPayload(decodedURIString)
//     req.body = JSON.parse(decryptedPayload)
//   }
//   next()
// }

module.exports = {
  logRequest,
  handleError
};
