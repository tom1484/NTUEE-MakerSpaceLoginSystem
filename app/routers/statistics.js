const express = require("express")
const mongoose = require("mongoose")
const crypto = require("crypto")

// import amongoose schemas
const Member = require("../models/member")
const Record = require("../models/record")
const { toNamespacedPath } = require("path")


mongoose.connect("mongodb://localhost:27017/mks_access")


const router = express.Router()

router.post("/statistics", async (req, res) => {
	const post_data = req.body

	let start = req.body.range.start
	let end = req.body.range.end
	let type = req.body.type

	const defaultDays = 7;
	if (start == "") {
		let startDate = new Date(end)
		startDate.setTime(startDate.getTime() - defaultDays * 86400000)
		console.log(startDate)
		start = await startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')
		console.log(start)
	}

	const records = await Record.where("timestamp").gt(start).lt(end)
	const result = []
	for (let record of records) {
		const member = (await Member.where("_id").equals(record.personalInfo))[0]
		result.push({
			member: member, 
			record: record
		})
	}
	console.log(result)

	// return successful execution result to ESP32
	res.json({
		flag: true,  
		list: result, 
	})
})


module.exports = router

