const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
    // Get the email and password from the request body 
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a user with the data
    await User.create({ email, password: hashedPassword });

    // Respond with success status
    res.sendStatus(200);
}

async function login(req, res) {


    try{
    // Get email and password from request body
    const { email, password } = req.body;

    // Find the user with requested email
    const user = await User.findOne({ email });
    if (!user) {
        // If user does not exist, return unauthorized status
        return res.sendStatus(401);
    }

    // Compare sent-in password with found user password hash 
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        // If passwords do not match, return unauthorized status
        return res.sendStatus(401);
    }

    // Create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set the token as a cookie
    res.cookie("Authorization", token,
     { expires: new Date(exp), 
        httpOnly: true ,
        sameSite: "lax",
         secure: process.env.NODE_ENV === "production" ,
     });
    
    // Send a success status
    res.sendStatus(200);
}
catch(err)
{
    console.log(err);
    res.sendStatus(400);

}
}

function logout(req, res) {


    try{
 // Clear the authorization cookie
 res.clearCookie("Authorization");

 // Send a success status
 res.sendStatus(200);
    }
   catch(err)
   {
    console.log(err);
    res.sendStatus(400);
   }
}


function checkAuth(req, res){
    try{
        console.log(req.user);
        res.sendStatus(200);
    }
    catch(err)
    {
        console.log(err);
    return res.sendStatus(400);
    }
    }
   

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
};
