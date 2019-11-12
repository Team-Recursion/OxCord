module.exports = {
    startCommunication : function(io) {
        console.log("Start socket connection");
        const comms = io.of("/communication");

        comms.on('connection', function(socket) {
            console.log('User has connected');
            socket.join(socket.pin);
            
            socket.on('host-join-up', function(data) {
                //Emit down event to room
                console.log("Room has been created, and host joined");
                socket.join(data.pin);
            });
    
            socket.on('user-join-up', function(data) {
                //Emit down event to room  
                console.log("user-join-up");          
            });
    
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