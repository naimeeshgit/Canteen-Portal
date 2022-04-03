var express = require("express");
var router = express.Router();

// Load User model == Load Buyer model
const User = require("../models/Vendor");

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
        managerName: req.body.managerName,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        shopName: req.body.shopName,
        password: req.body.password,
        type: 2
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


// login is in buyerAPI


// edit profile

router.put("/edit", (req, res) => {
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
            user.managerName = req.body.managerName;
            user.contactnumber = req.body.contactnumber;
            user.shopName = req.body.shopName;
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




module.exports = router;

