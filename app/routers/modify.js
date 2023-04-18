const express = require("express");
const mongoose = require("mongoose");

// import mongoose schemas
const Member = require("../models/member");
const Record = require("../models/record");


mongoose.connect("mongodb://localhost:27017/mks_access");

const router = express.Router();
router.post("/modify", async (req, res) => {
    const post_data = req.body;
    console.log(post_data);

    const type = post_data.type;

    if (type === "query") {
        const members = await Member.find({});
        res.json({
            flag: true, 
            members: members, 
        });
    }
    else if (type === "modify") {
        if (post_data.data.role === "disable") {
            await Record.deleteMany({ personalInfo: post_data.data._id });

            Member.deleteOne(
                {
                    _id: post_data.data._id, 
                }
            ).then((result) => {
                console.log("Delete member: ", result);
                result.json({
                    flag: true, 
                });
            });
        }
        else {
            Member.updateOne(
                {
                    _id: post_data.data._id, 
                }, 
                {
                    displayName: post_data.data.displayName, 
                    role: post_data.data.role, 
                }, 
                { new: true }
            ).then((result) => {
                console.log("Modify member: ", result);
                result.json({
                    flag: true, 
                });
            });
        }
    }
});


module.exports = router;

