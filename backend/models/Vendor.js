const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	managerName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true

	},
	contactnumber: {
		type: Number,
		required: true
	},
	shopName: {
		type: String,
		required: true,
		unique: true
	},


	password: {
		type: String,
		required: true,
		unique: true
	},

	type: {
		type: Number,
		required: true
	},

	// openingTime:{
	//     type: Date, 
	//     required: true
	// },
	// closingTime:{
	//     type: Date,
	//     required: true
	// }

});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
