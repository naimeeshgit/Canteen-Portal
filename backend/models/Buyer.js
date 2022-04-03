const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
        unique: true
	},
	contactnumber:{
		type: Number,
		required: true
	},
    age: {
        type: Number,
        required: true
    },
    batchName: {
        type: String,
        required: true
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
	wallet: {
		type: Number,
		required: false
	}
});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);
