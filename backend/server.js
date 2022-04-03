const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "Portal";

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var BuyerRouter = require("./routes/BuyerAPI");  // any request to /buyer will be handled by this router
var VendorRouter = require("./routes/VendorAPI"); // any request to /vendor will be handled by this router
var FoodItemRouter = require("./routes/FoodItem"); // any request /items 
var BuyerMenuRouter = require("./routes/MenuAPI");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/buyer", BuyerRouter); // anything that goes to /buyer will be handled by this router
app.use("/vendor", VendorRouter); // anything that goes to /vendor will be handled by this router
app.use("/item",FoodItemRouter); // 
app.use("/BuyerMenu",BuyerMenuRouter)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
