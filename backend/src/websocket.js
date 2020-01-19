const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');

let io;
const connections = [];

exports.setupWebsocket = server => {
	const io = socketio(server);

	io.on('connection', socket => {
		const { latitude, longitude, techs } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude),
			},
			techs: parseStringAsArray(techs),
		});
	});
};

exports.findConnections = (coordinates, tecs) => {
	return connections.filter(connection => {
		return (
			calculateDistante(coordinates, connection.coordinates) < 10 &&
			connection.techs.some(item => techs.includes(item))
		);
	});
};

exports.sendMessage = (to, message, data) => {
	to.forEach(connection => {
		io.to(connection.id).emit(message, data);
	});
};
