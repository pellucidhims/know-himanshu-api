var nodemailer = require("nodemailer");
const util = require("./utils");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SERVICE = process.env.SERVICE || "gmail";

const defaultMailOptions = {
  from: EMAIL_USER,
  to: "sharmahimahsu1494@gmail.com",
  subject: "Greetings from Hazaar Carobar app",
  html:
    "<div style='text-align:center;'><h3>Greetings from Hazaar Carobar</h3><p>Welcome to Hazaar Carobar app. Your right car at the right price is just clicks away. We find the best deals for our users and believe in providing the best servide possible. Sort and select car matching your needs from a wide variety of cars.</p><p>Team Hazaar Carobar</p><p>For any suggestions, ideas, issues or feedback, please write to us at:  quoteaquote.india@gmail.com</p></div>"
};

async function mailingUtil({ sendTo, htmlMessage, subject, from }) {
  let transporter = nodemailer.createTransport({
    service: SERVICE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  let mailOptions = {
    from: !!from ? from : defaultMailOptions.from,
    to: !!sendTo ? sendTo : defaultMailOptions.to,
    subject: !!subject ? subject : defaultMailOptions.subject,
    html: !!htmlMessage ? htmlMessage : defaultMailOptions.html
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      util.logger(`ERROR in mailing utility while sending email -`, error);
    } else {
      util.logger(`Email sent: `, info);
      return JSON.stringify(info);
    }
  });
}

exports.sendEmail = ({
  sendTo = "",
  htmlMessage = "",
  subject = "",
  from = ""
}) => {
  return (async ({ sendTo, htmlMessage, subject, from }) => {
    return await mailingUtil({ sendTo, htmlMessage, subject, from });
  })({ sendTo, htmlMessage, subject, from });
};
