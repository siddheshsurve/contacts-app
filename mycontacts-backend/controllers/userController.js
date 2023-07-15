const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    //compare user provided password with db hashed password
    if(user && (await bcrypt.compare(password, user.password))) {
        
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1m",
        }
        );

        res.status(200).json({ accessToken });
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }

});

//@desc Current User
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json({ message : "Current user information" });
});


module.exports = { registerUser, loginUser, currentUser }