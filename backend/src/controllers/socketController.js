const dbAPI = require('../dynamodb/dbAPI');

module.exports = {
    startCommunication : function(io) {
        console.log("Start socket connection");
        const comms = io.of("/communication");

        //triggers upon created room/joined room
        comms.on('connection', function(socket) {
            console.log(socket.id, 'User has connected');
            
            //triggers on created room
            socket.on('host-join-up', function(data) {
                //Emit down event to room
                if(data.pin) {
                    console.log(`Room ${data.pin} has been created, and host joined`);
                    socket.join(data.pin);
                } else {
                    console.log("Room PIN is undefined");
                }
                
                
            });

            //triggers upon tab close/refresh
            socket.on('disconnect', function(data) {
                //Emit down event to room
                console.log("user disconnected");                 
            });

            socket.on('delete-room', function(data) {
                console.log("Delete room");
                dbAPI.deleteRoom(data.pin);
            });

            //triggers upon regular user joining room
            socket.on('user-join-up', function(data) {
                //Emit down event to room  
                console.log(`User has joined room ${data.pin}`); 
                var clients = comms.in(data.pin).clients((err,clients) => {
                    if(err) throw error;
                    console.log('Number of users in room ' + data.pin + " " + clients)
                });
                socket.join(data.pin);         
            });
            socket.on('user-request-queue-up', function(data) {
                console.log('user-request-queue-up from', data.pin);
                
                comms.in(`${data.pin}`).emit('user-request-queue-down', data);
            });

            socket.on('host-response-queue-up', function(data){
                console.log('host-response-queue-up from', data.pin);
                console.log(data);
                
                comms.in(`${data.pin}`).emit('host-response-queue-down', data);
            });

            //triggers on test in user page
            socket.on('test', function(data) {
                console.log("test");
                comms.in(`${data.pin}`).emit('test');
            })
    
            //triggers upon song added in user or host page (adds in all Q's for the room)
            socket.on('add-song-up', function(data) {
                //Emit down event to room
                console.log("add-song-up", data);
                
                comms.in(`${data.pin}`).emit('add-song-down', data)
            });

            //triggers upon song removal in user page (deletes in all Q's for the room)
            socket.on('remove-song-up', function(data){
                comms.in(`${data.pin}`).emit('remove-song-down', data)
            })

            //currently not used
            socket.on('update-queue-up', function(data) {
                //Emit down event to room
                console.log("update-queue-up to room " + data.pin);
                comms.in(`${data.pin}`).emit('update-queue-down', data);
            });

            socket.on('leave-room', function(data) {
                console.log(`User has left room ${data.pin}`);
                socket.leave(data.pin);
            });

            socket.on('no-current-song', data => {
                console.log('no-current-song-up');
                comms.in(`${data.pin}`).emit('no-current-song-down');
            })
        })
    }
}