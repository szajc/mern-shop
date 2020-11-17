const router = require("express").Router();
const Shop = require("../models/shopModel");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.get("/all", async (req, res) => {
    const items = await Shop.find({})
    res.json(items)
})

router.post("/add", async (req, res) => {
    try {
        const { name, category, available, use, count, price } = req.body;
        // validation
        if (!name)
            return res.status(400).json({ msg: "Enter name of item!" });
        if (!category)
            return res.status(400).json({ msg: "Enter category of item!" });
        if (!available)
            return res.status(400).json({ msg: "Enter if item available!" });
        if (!count)
            return res.status(400).json({ msg: "How many in package missing: count!" });
        if (!price)
            return res.status(400).json({ msg: "Enter price!" });
        if (!use) use = "";
        const newShopItem = new Shop({
            name,
            category,
            available,
            use,
            count,
            price,
            uid: new mongoose.mongo.ObjectId(),
        })
        const savedShopItem = await newShopItem.save();
        res.json(savedShopItem);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
router.get("/:id", async (req, res) => {
    const shopItem = await Shop.findOne({uid: req.params.id})
    if(!shopItem)
        return res
            .status(400)
            .json({
                msg: "No item found with this ID!"
            })
    res.json(shopItem);
})

module.exports = router