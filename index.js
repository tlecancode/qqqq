const prompt = require('prompt');
const forever = require('forever-monitor');

prompt.start()

prompt.get(['host', 'username', 'password', 'dbname'], function (err, result) {
	var child = new (forever.Monitor)('devServer.js', {
		max: 3,
		args: ['-h', result.host, '-u', result.username, '-p', result.password, '-d', result.dbname]
	});

	child.on('exit', function () {
		console.log('devServer.js has exited after 3 restarts');
	});

	child.start()
});