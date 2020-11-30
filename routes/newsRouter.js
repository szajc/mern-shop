const router = require("express").Router();
const News = require("../models/newsModel");
const auth = require("../middleware/auth");

router.post("/add", async (req, res) => {
    try {
        const {email} = req.body;
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // validation
        if (email==="")
            return res.status(400).json({ msg: "Enter Email!" });
        if (!email.match(mailformat)) 
            return res.status(400).json({ msg: "Not valid Email!" });
        const newNewsEmail = new News({
            email: email,
        })
        const savedEmail = await newNewsEmail.save();
        res.json(savedEmail);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router