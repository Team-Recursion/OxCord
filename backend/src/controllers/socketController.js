module.exports = {
    startCommunication : function(io) {
        console.log("Start socket connection");
        const comms = io.of("/communication");

        comms.on('connection', function(socket) {
            console.log(socket.id);
            console.log('User has connected');
            
            socket.on('host-join-up', function(data) {
                //Emit down event to room
                console.log(`Room ${data.pin} has been created, and host joined`);
                socket.join(data.pin);
                console.log("sdffsdfsfd");
                
            });
    
            socket.on('user-join-up', function(data) {
                //Emit down event to room  
                console.log(`User has joined room ${data.pin}`); 
                socket.join(data.pin);         
            });

            socket.on('test', function(data) {
                comms.in(`${data.pin}`).emit('test');
            })
    
            socket.on('add-song-up', function(data) {
                //Emit down event to room
                console.log("add-song-up");
            });
    
            socket.on('update-queue-up', function(data) {
                //Emit down event to room
                console.log("update-queue-up");
            });
        })

        
        
    }
}