import { Server } from 'node:http';
import { Server as IOServer } from 'socket.io';

export const createSocket = (server: Server) => {
    const io = new IOServer(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('Connected from client');
        socket.on('clientEvent', (msg) => {
            console.log(msg);
            io.sockets.emit('nodeEvent', `New message: ${msg}`);
        });
    });
};
