const express = require('express');
const User = require('../models/User');
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

//Route 1: Registering user using: POST "/api/auth/register"
router.post('/register', async (req, res) => {

    // validating
    let success = false;
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        // creaing user
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })

        const jwtSecretKey = "hameed"
        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, jwtSecretKey)

        success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//Route 2: Authenticating user using: POST "/api/auth/login"
router.post('/login', async (req, res) => {

    let success = false;
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ success, error: "Invalid Credentials" });
        }
        if (password === "") {
            return res.json({ error: "Password is required" })
        };

        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success, error: 'Invalid credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const jwtSecretKey = "hameed"
        const authtoken = jwt.sign(data, jwtSecretKey)

        success = true
        res.json({ success, authtoken })


    } catch (error) {
        success = false;
        console.error(success, error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route 3: Loggedin user details  using POST "/api/auth/getusr". login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.json({ user })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }

})


module.exports = router;