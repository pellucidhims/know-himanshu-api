require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const util = require("./utils/util");
const config = require('./utils/config');
const visitor = require("./routes/visitor.route");
const admin = require("./routes/admin.route");
const customMiddleware = require("./middlewares/middleware");
const healthCheck = require("./routes/healthCheck.route");
// const UserImage = require("./models/userImage.model");

const app = express();
// mongoDB connection start ---
let reconnectTries = 0
const dbConfig = process.env.NODE_ENV === 'production' ? config.prod : config.dev;
const dbUrl = 'mongodb+srv://'
  + `${dbConfig.dbUserName}:${dbConfig.dbPassword}@${dbConfig.hostName}/${dbConfig.dbName}`
  + `?${dbConfig.queryParams}`;

const mongoDB = dbUrl;
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
  // eslint-disable-next-line no-console
  console.error.bind(console, 'MongoDB connection error:');
  mongoose.disconnect();
});
db.on('connected', () => {
  util.logger('MongoDB connected!');
});
db.on('reconnected', () => {
  util.logger('MongoDB reconnected!');
});
db.on('disconnected', () => {
  util.logger('MongoDB disconnected! Trying to connect again...');
  if(reconnectTries > 10) return
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
  });
  reconnectTries += 1
});
const mongooseConfig = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  poolSize: 10,
};
mongoose.connect(mongoDB, mongooseConfig);
// mongoDB connection end ---

app.use(
  cors({
    maxAge: 600 // enable browser to cache the preflight response for a request for 600s
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public/accountActivationSuccess.html"));
app.use(customMiddleware.logRequest);
app.use("/visitor", visitor);
app.use("/admin",admin);
app.use("/healthCheck", healthCheck);

// This path is used post account activation and static account activation HTML file is served.
// app.get('/activationSuccess', function (req, res) {
//   res.sendFile(__dirname + "/public/accountActivationSuccess.html");
// });
app.use(customMiddleware.handleError);

const port = process.env.PORT || 8800;
app.listen(port, () => {
  util.logger("App is now running on port: ", port);
});
