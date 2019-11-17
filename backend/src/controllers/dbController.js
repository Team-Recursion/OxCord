const dbAPI = require('../dynamodb/dbAPI');
var express = require("express");
var router = express.Router();

router.post("/createRoom", async(req, res) => {
    console.log("Inside POST/createRoom");
    const pin = req.body.pin;
    console.log("Room PIN: " + pin);
    let resStatus = 500;
    if(pin) {
        try{
            const dbCall = await dbAPI.createRoom(pin);

            if(dbCall.statusCode = 200) {
                resStatus = 200;
            }
        } catch (e) {
            resStatus = 400;
        }
    }

    res.sendStatus(resStatus).end();
});

router.delete("/deleteRoom", (req, res) => {
    console.log("Inside DELETE/deleteRoom");
    const pin = req.body.pin;
    console.log(req.body.pin);
    let resStatus = 500;
    if(pin) {
        try{
            const dbCall = dbAPI.deleteRoom(pin);
            
            if(dbCall.statusCode == 200) {
                resStatus = 200;
            }
        } catch (e) {
            resStatus = 400;
        }
    } else {
        console.log("Something wrong with pin");
    }

    res.sendStatus(resStatus).end();
});

router.get("/doesRoomExist", async (req, res) => {
    console.log("Inside GET/doesRoomExist");
    console.log(req.query);
    const pin = req.query.pin;
    let resString = "API was hit";
    let exists = false;
    if(pin) {
        try {
            const dbCall = await dbAPI.doesRoomExist(pin);
            console.log("route result: " + dbCall);
            if(dbCall) {
                exists = true;
            } else {
                exists = false;
            }
        } catch (e) {   
            resString = "DB get error";
        }
    }

    resultJSON = {
        resString: resString,
        exists: exists
    }

    console.log(JSON.stringify(resultJSON));
    res.send(resultJSON).end();
});

module.exports = router;