const express = require("express")
const mongoose = require("mongoose")
const crypto = require("crypto")

// import mongoose schemas
const Member = require("../models/member")
const Record = require("../models/record")


mongoose.connect("mongodb://localhost:27017/mks_access")

const router = express.Router()
router.post("/update", async (req, res) => {
	try {
		const post_data = req.body
		// encrypt RFID with SHA-256
		// post_data.RFID = crypto.createHash('sha256').update(post_data.RFID).digest('base64')
		console.log("Post data:")
		// console.log(post_data)
		// post_data.RFID = crypto.createHash("sha256").update(post_data.RFID).digest('base64')
		console.log(post_data.RFID)
		// find corresponding member and then add one record
		const member = await Member.findOne({ RFID: post_data.RFID })
		console.log(member)
		if (member == null)
		{
			res.json({
				flag: false,
			})
		}
		else
		{
			const record_data = {
				personalInfo: member._id,
				timestamp: post_data.timestamp
			}
			console.log(record_data)
			const record = new Record(record_data)
			const recorded = await record.save()
			console.log(recorded)
			res.json({
				flag: true,
				personalInfo: member,
			})
		}
	}
	catch (e) {
		res.json({ flag: false })
	}
})


module.exports = router

