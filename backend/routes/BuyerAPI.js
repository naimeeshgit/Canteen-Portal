const { json } = require("body-parser");
var express = require("express");
var router = express.Router();

// Load User model == Load Buyer model
const User = require("../models/Buyer");
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/signup", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        age: req.body.age,
        batchName: req.body.batchName,
        password: req.body.password,
        wallet: 0,
        type: 1
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    console.log(email);

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            // find in vendorAPI
            Vendor.findOne({ email }).then(vendor => {

                if (!vendor) {
                    return res.status(404).json({
                        error: "Email not found",
                    });
                }
                else {
                    // match password
                    if (vendor.password != req.body.password) {
                        return res.status(404).json({
                            error: "Password not matched",
                        });
                    }
                    else {

                        vendor.type = 2;

                        const VendoData = {
                            id: vendor.id,
                            email: vendor.email,
                            contactnumber: vendor.contactnumber,
                            shopName: vendor.shopName,
                            password: vendor.password,
                            type: vendor.type,
                            managerName: vendor.managerName
                        };
                        res.json(VendoData);

                    }
                }


            });
        }
        else {
            // match password
            if (user.password != req.body.password) {
                return res.status(404).json({
                    error: "Password not matched",
                });
            }
            else {
                // window.location = "/";
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    contactnumber: user.contactnumber,
                    age: user.age,
                    batchName: user.batchName,
                    password: user.password,
                    type: 1
                };
                // console.log(userData);
                res.json(userData);
                // Navigation.navigate("Profile");
            }

        }
    });
});


router.put("/edit", (req, res) => {
    // console.log(req.body);
    const email = req.body.email;
    console.log(email);
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            user.name = req.body.name;
            user.contactnumber = req.body.contactnumber;
            user.age = req.body.age;
            user.batchName = req.body.batchName;
            user.password = req.body.password;
            user.save()
                .then(user => {
                    res.json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});


router.post("/checkbalance", (req, res) => {

    const id = req.body.id
    const email = req.body.email;
    User.findOne({ email: email}).then(user=> {
            return res.json(user);
    });

});


router.post("/addmoney", (req,res) => {
    const id = req.body.id;
    const email = req.body.email;
    const transaction = req.body.wallet;

    User.findOne({email : email}).then(user=> {
        
            user.wallet = (user.wallet) + Number(transaction);
            console.log(user);
            user.save()
                .then(user => {
                    return res.json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
            
        
        
    })
})

module.exports = router;

