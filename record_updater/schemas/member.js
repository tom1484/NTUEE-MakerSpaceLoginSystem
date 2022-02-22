const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
	displayName: {
		type: String, 
		default: "", 
	}, 
	role: {
		type: String, 
		default: "student", 
	}, 

	RFID: {
		type: String, 
		required: true, 
	}, 
	studentID: {
		type: String, 
		required: true, 
	}, 
	
	createdTime: {
		type: String, 
		required: true, 
		immutable: true, 
	}, 
	modifiedTime: {
		type: String, 
		default: "", 
	}, 
})

module.exports = mongoose.model("member", memberSchema)
