const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");

// import amongoose schemas
const Member = require("../models/member");
const Record = require("../models/record");
const { toNamespacedPath } = require("path");


mongoose.connect("mongodb://localhost:27017/mks_access");


const router = express.Router();

function timeShift(timestamp) {
    let date = new Date(timestamp);
    date.setTime(date.getTime() + 20 * 60 * 60 * 1000);
    timestamp = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return timestamp
}

async function countVisit(records) {
    counts = {};

    for (const record of records) {
        const member = (await Member.where("_id").equals(record.personalInfo))[0];
        if (counts[member.RFID]) {
            counts[member.RFID].visit += 1;
        }
        else {
            counts[member.RFID] = {
                Name: member.displayName, 
                visit: 1, 
            };
        }
    }

    result = [];
    for (const [RFID, visit] of Object.entries(counts)) {
        result.push({
            Name: visit.Name, 
            visit: visit.visit, 
        });
    }

    return result;
}

async function countLog(records) {
    let result = [];

    for (let record of records) {
        const member = (await Member.where("_id").equals(record.personalInfo))[0];
        result.push({
            member: member, 
            record: record, 
        });
    }

    return result;
}

router.post("/statistics", async (req, res) => {
    console.log(req.body);
    const post_data = req.body;

    let start = req.body.range.start;
    let end = req.body.range.end;
    let type = req.body.type;

    start = timeShift(start);
    end = timeShift(end);

    const records = await Record.where("timestamp").gt(start).lt(end);

    const logs = await countLog(records);
    const visits = await countVisit(records);

    const resData = {
        flag: true,  
        list: logs, 
        visit: {
            people: visits.length, 
            visitTable: visits, 
        }, 
    };
    res.json(resData);
});


module.exports = router;

