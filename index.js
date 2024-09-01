require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),
	function (req, res, next) {
		const file_info = req.file;
		console.log(file_info);
		res.json({
			name: file_info.originalname,
			type: file_info.mimetype,
			size: file_info.size
		});
	});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port)
});
