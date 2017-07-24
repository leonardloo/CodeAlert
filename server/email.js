const nodemailer = require('nodemailer');
const fs = require('fs');

var authOptions = {};
exports.initEmail = function(callback) {
  // Connects to your gmail, and uses gmail as the SMTP server to send from
  fs.readFile('./credentials.txt', 'utf-8', function(err, data) {
    try {
      var lines = data.split(/[\r\n]+/g);
      authOptions = {
        user: lines[0],
        pass: lines[1]
      }
      callback();
    } catch(err) {
      console.log('credentials.txt should have email in the first' + 
        ' line and password in the next');
      callback();
    }
  });
};

exports.sendEmail = async function(to, subject, message) {
  if (authOptions['user'] == undefined) {
    console.log('credentials.txt was not read in correctly. Email is missing.');
    return;
  }
  
  const mailOptions = {
    from: authOptions['user'],
    to,
    subject,
    html: message,
  };

  const transport = nodemailer.createTransport({
    pool: false,
    service: 'gmail',
    auth: authOptions
  });

  try {
    await transport.sendMail(mailOptions, (error) => {
      if (error) { console.log(error); }
    });
    await transport.close();
  } catch(err) {
    console.log(err);
    await transport.close();
  }
};
