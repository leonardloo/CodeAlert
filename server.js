const express = require('express')
const sendEmail = require('./notifier/send-email');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypt = require('./notifier/crypt');

const app = express()
const PORT = 3001


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.render('index.html');
})

app.post('/email', function(req, res) {
	var to = req.body.email;
	var logtext = req.body.logtext;
	if (to == undefined) {
		res.send('Email failed to send');
	} else {
		// Read email and password from disk first
		fs.readFile('credentials.txt', 'utf-8', function(err, data) {
		  var lines = data.split(/[\r\n]+/g);
		  const email = lines[0];
		  const encryptedPassword = crypt.encrypt(lines[1]);

			let subject = "Email notification from CodeAlert"
			let message = logtext == undefined ? "" : logtext;
			sendEmail(to, subject, logtext, email, encryptedPassword);
			console.log(email);
			res.send('Email sent successfully!')
		});
	}
});


app.listen(PORT, function () {
  console.log('Forma listening on port ' + PORT);
})
