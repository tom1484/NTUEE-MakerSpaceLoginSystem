const express = require("express");
const mongoose = require("mongoose");

// import mongoose schemas
const Member = require("../models/member");


mongoose.connect("mongodb://localhost:27017/mks_access");

const router = express.Router();
router.post("/register", async (req, res) => {

    const post_data = req.body;

    const displayName = post_data.studentID;
    const RFID = post_data.RFID;
    const studentID = post_data.studentID;
    const timestamp = post_data.timestamp;

    let member = await Member.findOne({ RFID: RFID });
    if (member) {
        res.json({ flag: false });
    }
    else {
        const member_data = {
            displayName: displayName, 
            role: "student", 
            RFID: RFID, 
            studentID: studentID, 
            createdTime: timestamp, 
        };
        console.log(member_data);
        
        member = new Member(member_data);
        member.save().then((member) => {
            res.json({
                flag: true, 
                personalInfo: member
            });
        });
    }
});


module.exports = router;

