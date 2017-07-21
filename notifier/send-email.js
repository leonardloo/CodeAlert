const nodemailer = require('nodemailer');
const crypt = require('./crypt');

module.exports = function sendEmail(to, subject, message, email, pass) {
  const mailOptions = {
    from: email,
    to,
    subject,
    html: message,
  };

  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: crypt.decrypt(pass),
    },
  });

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
