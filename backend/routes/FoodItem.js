const { json } = require("body-parser");
var express = require("express");
var router = express.Router();

// Load User model == Load Buyer model
const Item = require("../models/foodItem");
// const Vendor = require("../models/Vendor");


router.post("/getItem", (req, res) => {

    const email = req.body.email;
    Item.find({ VendorEmail: email }).then(item => {
        return res.json(item);
    });

});

router.post("/add", (req, res) => {
    console.log(req.body);
    const newItem = new Item({
        VendorEmail: req.body.VendorEmail,
        FoodName: req.body.FoodName,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        tags: req.body.tags,
        addon: req.body.addon,
        addonPrice: req.body.addonPrice,
        nR: 0,
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send(err);
        });
});


router.put("/edit", (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    Item.findOne({ _id: id }).then(item => {
        item.FoodName = req.body.FoodName;
        item.price = req.body.price;
        // item.rating = req.body.rating;
        item.type = req.body.type;
        item.tags = req.body.tags;
        item.addon = req.body.addon;
        item.addonPrice = req.body.addonPrice;

        item.save()
            .then(item => {
                return res.status(200).json(item);
            }
            )
            .catch(err => {
                return res.status(400).send(err);
            }
            );
    });



});


// DELETE request: Delete an item from DB
router.post("/delete", (req, res) => {

    const id = req.body.id;
    console.log(req.body);
    Item.findByIdAndDelete(id, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted");
            res.status(200).json(user);
        }
    });
});




module.exports = router;


