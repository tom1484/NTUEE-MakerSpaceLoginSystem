const express = require("express")
const mongoose = require("mongoose")
const crypto = require("crypto")

// import mongoose schemas
const Member = require("../models/member")


mongoose.connect("mongodb://localhost:27017/mks_access")

const router = express.Router()
router.post("/register", async (req, res) => {
	try {
		const post_data = req.body
		// encrypt RFID with SHA-256
		// post_data.RFID = crypto.createHash('sha256').update(post_data.RFID).digest('base64')

		const member_data = {
			displayName: post_data.studentID, 
			role: "student", 
			RFID: post_data.RFID, 
			studentID: post_data.studentID, 
			createdTime: post_data.timestamp
		}
		console.log(member_data)
		const member = new Member(member_data)
		member.save()

		res.json({
			flag: true, 
			personalInfo: member
		})
	}
	catch (e) {
		res.json({ flag: false })
	}
})


module.exports = router

