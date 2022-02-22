const express = require("express")
const mongoose = require("mongoose")
const crypto = require("crypto")

// import mongoose schemas
const Member = require("./schemas/member")
const Record = require("./schemas/record")


mongoose.connect("mongodb://localhost:27017/mks_access")

const router = express.Router()
router.post("/record_update", async (req, res) => {
	const post_data = req.body
    // encrypt RFID with SHA-256
	post_data.RFID = crypto.createHash('sha256').update(post_data.RFID).digest('base64')
	console.log(post_data)

    // find corresponding member and then add one record
	await Member.findOne({ RFID: post_data.RFID })
		.then((member) => {
			console.log(member)

			const record_data = {
				personalInfo: member._id, 
				timestamp: post_data.timestamp, 
			}
			const record = new Record(record_data)
			record.save()

            // return successful execution result to ESP32
			res.json({
				flag: 1, 
				personalInfo: member, 
			})
		})
		.catch(err => res.json({ flag: 0 }))
})


module.exports = router

