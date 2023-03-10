const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var cors = require('cors');
const app = express();

app.use(cors());

// set port to 3000 and listen
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});

app.get('/script.js', function (req, res) {
	res.type('application/javascript');
	res.sendFile(__dirname + '/script.js');
});

app.get('/styles.css', function (req, res) {
	res.type('text/css');
	res.sendFile(__dirname + '/styles.css');
});

app.get('/', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.sendFile(path.join(__dirname, '/index.html'));
});
