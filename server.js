/*
server
*/

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;

server.listen(port, () => {
	console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));


/*
utilities
*/

function randomString(length) {
	let result = '';
	let budget = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var max = budget.length;
	for ( var i = 0; i < length; i++ ) {
		result += budget.charAt( Math.floor(Math.random() * max) );
	}
	return result;
}

function userId(){
	return randomString(16);
}

/*
socket app
*/

let numUsers = 0;

io.on('connection', (socket) => {
	let addedUser = false;

	console.info('Socket.io started');

	/*

	client -> server
	- connect user
	- update user
	- disconnect user

	server -> client
	- connected
	- user joined
	- user updated
	- user left

	*/

	// when the client emits 'add user', this listens and executes
	socket.on('connect user', (user) => {
		if (addedUser) return;

		user = {...user,
			id: userId()
		};

		socket.user = user;
		numUsers++;
		addedUser = true;

		console.log(`${numUsers} users connected`);

		// emit to user
		socket.emit('connected', {
			user: user,
			numUsers: numUsers
		});

		// broadcast to all
		socket.broadcast.emit('user joined', {
			user: user,
			numUsers: numUsers
		});
	});

	socket.on('update user', (user) => {
		socket.broadcast.emit('user updated', {
			user: user
		});
	});

	socket.on('disconnect user', (user) => {
		if (addedUser) {
			numUsers--;
			console.log(`disconnect user, ${numUsers} remaining`);

			socket.broadcast.emit('user left', {
				user: user,
				numUsers: numUsers
			});
		}
	});
});
