const db = require('./dynamodbConfig');

const pinTableName = 'Rooms';

async function createRoom(pin) {
    console.log("DB call createRoom");

    const params = {
        TableName: pinTableName,
        Item: {
            "PIN": pin
        }
    };

    db.docClient.put(params, function(err, data) {
        if(err) {
            console.err("Adding room failed: ", JSON.stringify(err,null));
        } else {
            console.log("Added room to table", JSON.stringify(data, null, 2));
        }
    
    });
}

async function deleteRoom(pin) {
    console.log("DB call deleteRoom");

    const params = {
        TableName: pinTableName,
        Key: {
            "PIN": pin
        }
    }

    db.docClient.delete(params, function(err, data) {
        if(err) {
            console.error("Unable to delete item: ", JSON.stringify(err,null));
        } else {
            console.log(`Deletion of room ${pin} successful`);
        }
    });
}

async function doesRoomExist(pin) {
    const params = {
        TableName: pinTableName,
        Key: {
            "PIN": pin
        }
    }

    db.docClient.get(params, function(err, data) {
        if(err) {
            console.error("Room does not exist: ", JSON.stringify(err,null));
            return false;
        } else {
            console.log(`Room ${pin} exists`);
            return true;
        }
    });
}

module.exports = {
    createRoom: createRoom,
    deleteRoom: deleteRoom
}