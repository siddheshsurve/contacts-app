const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    //if user (email) is already exist in db
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password : ", hashedPassword);

    //create new user
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    });

    //display if user created successfully
    console.log(`User created ${user}`);
    if(user) {
        res.status(201).json({
            _id : user.id,
            email : user.email,
        })
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({ message : "Register the user" });
});

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    res.json({ message : "Login the user" });
});

//@desc Current User
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json({ message : "Current user information" });
});


module.exports = { registerUser, loginUser, currentUser }