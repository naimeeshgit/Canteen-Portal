const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Vendor Name, Food Item, Quantity, Status, Cost and Rating
// Create Schema

// Vendor Name, Food Item, Price, Rating, tags, type, addon, addonPrice

const MyOrderBSchema = new Schema({
    VendorEmail: {
        type: String,
        required: true,
    },
	BuyerEmail: {
		type: String,
		required: true,
	},
	VendorName:{
		type: String,
		required: true
	},
    FoodName: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: false
    },
	tags: [{
        type: String,
		required: false
	}],
    addon: [{
        type: String,
        required: false
    }],
    addonPrice: [{
        type: Number,
        required: false
    }],
    orderStatus: {
        type: String,
        required: true
    }

});

module.exports = MyOrderB = mongoose.model("myorderB", MyOrderBSchema);
