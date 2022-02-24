const mongoose = require("mongoose")
const Member = require("./member")

const recordSchema = new mongoose.Schema({
	personalInfo: {
		type: mongoose.Schema.ObjectId, 
		ref: "member", 
		required: true, 
	}, 
	timestamp: {
		type: String, 
		required: true, 
	}, 
})

module.exports = mongoose.model("record", recordSchema)
