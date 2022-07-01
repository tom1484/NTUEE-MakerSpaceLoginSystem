const express = require("express")
const mongoose = require("mongoose")
const crypto = require("crypto")

// import amongoose schemas
const Member = require("../models/member")
const Record = require("../models/record")
const { toNamespacedPath } = require("path")


mongoose.connect("mongodb://localhost:27017/mks_access")


const router = express.Router()
// router.post('/statistics1', async (req, res, next) => {
// 	// console.log("req.body.range")
// 	res.json({ result: "Hey" })
//   });
router.post("/statistics", async (req, res) => {
	console.log("/statistic")
	const post_data = req.body
	console.log(req.body)
	const startArray = req.body.range.start
	const endArray = req.body.range.end
	for (var l = 0; l < startArray.length; l++) {
		var jsonItem = startArray[l]
	  }
	for (var l = 0; l < endArray.length; l++) {
		var jsonItem = endArray[l]
	  }	  
	var startObj = {
		"year": startArray[0]+startArray[1]+startArray[2]+startArray[3],
		"month": startArray[5]+startArray[6],
		"day": startArray[8]+startArray[9],
		"hour":startArray[11]+startArray[12],
		"minute":startArray[14]+startArray[15],
		"second":startArray[17]+startArray[18],
	  }
	var endObj = {
		"year": endArray[0]+endArray[1]+endArray[2]+endArray[3],
		"month": endArray[5]+endArray[6],
		"day": endArray[8]+endArray[9],
		"hour":endArray[11]+endArray[12],
		"minute":endArray[14]+endArray[15],
		"second":endArray[17]+endArray[18],
	  }

	const ans = await Record.where("timestamp").gt(startArray).lt(endArray)
	const result = []
	for( var i=0 ; i <ans.length ; i++ ){
		console.log(await Member.where("_id").equals(ans[0].personalInfo))
		const mem = (await Member.where("_id").equals(ans[0].personalInfo))[0]
		result.push({
			member: mem, 
			record: ans[i]
		})
	}
	console.log(result)

	// return successful execution result to ESP32
	res.json({
		flag: "1",  
		list: result, 
	})
})


module.exports = router

