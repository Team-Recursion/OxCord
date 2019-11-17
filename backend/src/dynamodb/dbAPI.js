const db = require('./dynamodbConfig');
const pinTableName = 'Rooms';


function createRoom(pin) {
    console.log("DB call createRoom");

    const params = {
        TableName: pinTableName,
        Item: {
            "PIN": pin
        }
    };

    let result = db.docClient.put(params, function(err, data) {
        if(err) {
            console.log("Adding room failed: ", JSON.stringify(err,null));
            return {
                statusCode: 400
            }
        } else {
            console.log("Added room to table", JSON.stringify(data, null, 2));
            return {
                statusCode: 200
            }
        }
    
    });

    return result;
}

function deleteRoom(pin) {
    console.log("DB call deleteRoom");

    const params = {
        TableName: pinTableName,
        Key: {
            "PIN": pin
        }
    }

    let result = db.docClient.delete(params, function(err, data) {
        if(err) {
            console.log("Unable to delete item: ", JSON.stringify(err,null));
            return {
                statusCode: 400
            }
        } else {
            console.log(`Deletion of room ${pin} successful`);
            return {
                statusCode: 200
            }
        }
    });

    return result;
}

async function doesRoomExist(pin) {
    console.log("DB call doesRoomExist");
    var numberPin = parseInt(pin,10);
    const params = {
        TableName: pinTableName,
        Key: {
            "PIN": numberPin
        },
        ProjectionExpression: "PIN",
        ConsistentRead: true,
    }

    let result = await db.docClient.get(params, function(err, data) {
        if(err) {
            console.log("Error: ", JSON.stringify(err,null));
        } else {
            //console.log("Get succeeded: ", JSON.stringify(data,null,2));
        }
    }).promise();

    if(result.Item !== undefined && result.Item !== null) {
        console.log(`Room ${pin} exists`);
        return true;
    } else {
        console.log(`Room ${pin} does not exist`);
        return false;
    }
}

module.exports = {
    createRoom: createRoom,
    deleteRoom: deleteRoom,
    doesRoomExist: doesRoomExist
}