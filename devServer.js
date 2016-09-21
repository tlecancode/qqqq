const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const argv = require('minimist')(process.argv.slice(2));
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

const mysql = require('mysql')
const pool = mysql.createPool({
	host: argv.h,
	user: argv.u,
	password: argv.p,
	database: argv.d,
	charset: 'tis620_thai_ci'
})

pool.getConnection((err, connection) => {
	if (err) {
		console.error('Error Connecting: ' + err.stack)
		process.exit(1)
	}
	connection.query('SELECT * FROM kskdepartment', (err, result) => {
		if (err) {
			console.error('Error Connecting: ' + err.stack)
			process.exit(1)
		}
	})
	connection.release()
})

app.get('/api/:depId', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	if (!parseInt(req.params.depId)) {
		res.statusCode = 400;
		res.json({error: `Cannot parse ${req.params.depId}`})
		res.end()
		return;
	}
	pool.getConnection((err, connection) => {
		if (err) {
			console.error('error connecting: ' + err.stack);
			res.statusCode = 500;
			res.json({error: `Cannot ${req.method} ${req.url}`, stack: err})
			res.end()
			return
		}
		connection.query('SET NAMES UTF8')
		connection.query(`SELECT kskdepartment.department as name, opduser.name as doctor_name, opduser.entryposition as doctor_position FROM kskdepartment LEFT JOIN opduser ON kskdepartment.doctor_code = opduser.doctorcode WHERE kskdepartment.depcode = ${parseInt(req.params.depId)}`, (err, department) => {
			if (err) {
				res.statusCode = 500;
				res.json({error: `Cannot ${req.method} ${req.url}`, stack: err})
				res.end()
				return;
			}
			if (department.length) {
				connection.query(`SELECT ovst.oqueue as queue_number, CONCAT(patient.pname, patient.fname, ' ', patient.lname) as patient_name FROM ovst INNER JOIN patient ON ovst.hn = patient.hn WHERE ovst.cur_dep = ${parseInt(req.params.depId)} ORDER BY cur_dep_time DESC LIMIT 5`, (err, queue) => {
					if (err) {
						res.statusCode = 500;
						res.json({error: `Cannot ${req.method} ${req.url}`, stack: err})
						res.end()
						return;
					}
					res.send({
						department: department[0],
						queue
					})
				})
				connection.release()
				return;
			}
			res.statusCode = 500;
			res.json({error: `Department Id: ${req.params.depId} not found`})
			connection.release()
		})
	})
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', (err) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:3000');
});


