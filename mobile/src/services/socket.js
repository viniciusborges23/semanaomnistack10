import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.6:3333', {
	autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
	socket.on('new-dev');
}

function connect(query) {
	socket.io.opts.query = query;

	socket.connect();

	// socket.on('message', text => {
	// 	console.log(text);
	// });
}

function disconnect() {
	if (socket.connected) {
		socket.disconnect();
	}
}

export { connect, disconnect, subscribeToNewDevs };
