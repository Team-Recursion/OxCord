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

    res.send(resStatus).end();
});

router.delete("/deleteRoom", (req, res) => {
    console.log("Inside DELETE/deleteRoom");
    const pin = req.body.pin;
    //console.log(req.body.pin);
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

    res.send(resStatus).end();
});

router.get("/doesRoomExist", (req, res) => {
    console.log("Inside GET/doesRoomExist");
    const pin = req.body.pin;
    let resString = "API was hit";
    let exists = false;
    if(pin) {
        try {
            const dbCall = dbAPI.doesRoomExist(pin);
                
            if(dbCall) {
                exists = true;
            }
        } catch (e) {   
            resString = "DB get error";
        }
    }

    resultJSON = {
        resString: resString,
        exists: exists
    }

    res.send(resultJSON).end();
});

module.exports = router;