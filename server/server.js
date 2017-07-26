const express = require('express')
const bodyParser = require('body-parser');
const email = require('./email');

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
		let subject = "Email notification from CodeAlert"
		let message = logtext == undefined ? "" : logtext;
		email.sendEmail(to, subject, logtext);
		res.send('Email sent successfully!')
	}
});

app.listen(PORT, function () {
	// On startup, read from credentials.txt
	email.initEmail(function() {
		console.log('Forma listening on port ' + PORT);	
	});
})
