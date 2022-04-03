var express = require("express");
var router = express.Router();

const Buyer = require("../models/Buyer");
const Vendor = require("../models/Vendor");
const FoodItem = require("../models/foodItem");
const MyOrderB = require("../models/myorderB");

router.get("/menu", async function (req, res) {
    const foods = await FoodItem.find()
    // const foods = await fds.json()
    foods.map(async (f) => {
        const vEmail = f.VendorEmail
        const v = await Vendor.findOne({ email: vEmail })
        console.log(v)
        console.log(f)
    })
    console.log(foods)
    res.json(foods)
});

router.get("/getshopName", (req, res) => {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })

});


router.post("/placeorder", (req, res) => {

    console.log("req in MENUAPI/placeorder:")
    console.log(req.body)

    const VendorEmail = req.body.VendorEmail;
    const FoodName = req.body.FoodName;
    var temp_rating = 0;

    // find the id of the item which has VendorEmail and FoodName
    FoodItem.findOne({ VendorEmail: VendorEmail, FoodName: FoodName }, function (err, food) {
        if (err) {
            console.log(err);
        } else {
            if (food.rating != null) {
                console.log("food.rating: ")
                console.log(food.rating);
                temp_rating = food.rating;
            }
        }
    });


    const newOrder = new MyOrderB({
        VendorEmail: req.body.VendorEmail,
        BuyerEmail: req.body.BuyerEmail,
        VendorName: req.body.VendorName,
        FoodName: req.body.FoodName,
        Quantity: req.body.Quantity,
        price: req.body.price,
        // rating: temp_rating,
        // rating: req.body.rating,
        // tags: req.body.tags,
        // addon: req.body.addon,
        // addonPrice: req.body.addonPrice,
        orderStatus: "placed"

    });

    console.log("in /placeorder")
    console.log(newOrder)

    newOrder.save()
        .then(order => {
            // // find Buyer from BuyerEmail in Buyer
            Buyer.findOne({ email: req.body.BuyerEmail }, function (err, buyer) {
                totalprice = (req.body.price) * (req.body.Quantity)
                console.log(totalprice)
                if (buyer.wallet >= totalprice) {
                    console.log("Milega terko ye bhai: [MENUAPI]: placeorder")
                    buyer.wallet = buyer.wallet - totalprice;
                    buyer.save();
                    return res.status(200).json(order);
                }

                else {
                    console.log("Insufficient Balance")
                    return res.status(400).send("Insufficient Balance");

                }
            });

        })
        .catch(err => {
            console.log(err)
            // console.log(res.body)
            console.log("nahi place hora: [MENUAPI]: placeorder")
            return res.status(400).send(err);
        })

});


router.post("/rate", (req, res) => {

    const VendorEmail = req.body.VendorEmail;
    const FoodName = req.body.FoodName;
    // find the id of the item which has VendorEmail and FoodName
    FoodItem.findOne({ VendorEmail: VendorEmail, FoodName: FoodName }, function (err, food) {
        if (err) {
            console.log(err);
        } else {
            food.nR = food.nR + 1;
            food.rating = food.nR * food.rating + req.body.rating;
            food.rating = food.rating / food.nR;
            console.log(food);
            food.save();
            return res.status(200).json(food);
        }
    });
});



router.post("/BgetOrder", (req, res) => {
    const email = req.body.email;
    MyOrderB.find({ BuyerEmail: email }).then(order => {
        return res.json(order);
    });

});

router.post("/VgetOrder", (req, res) => {
    const email = req.body.email;
    MyOrderB.find({ VendorEmail: email }).then(order => {
        return res.json(order);
    });

});

router.post("/nextStage", async (req, res) => {
    const id_food = req.body.id_food;
    const ins = req.body.instruction;

    console.log(id_food)
    console.log(ins)
    

    order = await MyOrderB.findOne({ _id: id_food })
    console.log(order)
    // const currentstatus = order.orderStatus  
    // console.log(currentstatus)

   
        if (order.orderStatus.toString() == "placed") {
            if(ins.toString() == "reject"){
                order.orderStatus = "REJECTED"
                await order.save()
                return res.json("REJECTED")
            }
            else {
            order.orderStatus = "ACCEPTED"
            console.log("here")
            await order.save();
            return res.json("ACCEPTED")
            }
        }
        else if (order.orderStatus.toString() == "ACCEPTED") {
            order.orderStatus = "COOKING"
            await order.save();
            return res.json("COOKING")
        }
        else if (order.orderStatus.toString() == "COOKING") {
            order.orderStatus = "READY TO PICKUP"
            await order.save();
            return res.json("READY")
        }
        else if (order.orderStatus.toString() == "READY TO PICKUP") {
            order.orderStatus = "COMPLETED"
            await order.save();
            return res.json("COMPLETED")
        }
        else if(order.orderStatus.toString() == "REJECTED"){
            return res.json("REJECTED")
        }
        else if(order.orderStatus.toString() == "COMPLETED"){
            return res.json("COMPLETED")
        }

});

router.post("/top", function (req, res) {

    MyOrderB.find({ VendorEmail: req.body.email, orderStatus: "COMPLETED" }, function (err, orders) {
        if (err) {


        }
        else {
            var dict = {};
            console.log(orders);
            orders.map((order) => {
                if (dict[order.FoodName]) { dict[order.FoodName] += 1; }
                else { dict[order.FoodName] = 1; }
            })
            var items = Object.keys(dict).map(function (key) {
                return [key, dict[key]];
            });

            items.sort(function (first, second) {
                return second[1] - first[1];
            });
            res.json(items);
        }
    });
});


router.post("/stat", function (req, res) {

    MyOrderB.count({ VendorEmail: req.body.email, orderStatus: "COMPLETED" }, function (err, count1) {
        if (err) { console.log(err) }
        else {
            MyOrderB.count({ VendorEmail: req.body.email, orderStatus: "REJECTED" }, function (err, count2) {
                if (err) { console.log(err) }
                else {
                    MyOrderB.count({ VendorEmail: req.body.email }, function (err, count3) {
                        if (err) { console.log(err) }
                        else {
                            
                            res.json({ completed: count1, rejected: count2, total: count3 });
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;

