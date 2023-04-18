const express = require("express");
const mongoose = require("mongoose");

// import mongoose schemas
const Member = require("../models/member");
const Record = require("../models/record");


mongoose.connect("mongodb://localhost:27017/mks_access");

const router = express.Router();
router.post("/update", async (req, res) => {
    const post_data = req.body;
    console.log(post_data);

    // find corresponding member and then add one record
    const member = await Member.findOne({ RFID: post_data.RFID });

    if (member) {
        const record_data = {
            personalInfo: member._id,
            timestamp: post_data.timestamp
        };
        // console.log(record_data);

        const record = new Record(record_data);
        record.save().then((record) => {
            console.log(record);
            res.json({
                flag: true,
                personalInfo: member,
            });
        });
    }
    else {
        res.json({
            flag: false,
        });
    }
});


module.exports = router;

