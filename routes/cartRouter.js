const router = require("express").Router();
const Cart = require("../models/cartModel");
const auth = require("../middleware/auth");

// finds all items belonging to user
router.get("/all", auth, async (req, res) => {
    const items = await Cart.find({owner: req.user})
    res.json(items);
})
// find all items belonging to cookie stored ...
router.get("/allcookies", auth, async (req, res) => {
    const items = await Cart.find({cookie: req.body})
    // probably do a change from cookie to user but first call /all
    res.json(items);
})
//adding additional value to count: +1
router.post("/updatecart", auth, async (req, res) => {
    const newCount = req.body.item.count + req.body.quantity;
    const cartItemPlusCount = await Cart.findOneAndUpdate(
        // first we search what we are looking for
        {
            uid: req.body.item.uid,
            owner: req.user,
        },// we set a new value where we want
        {
            count: newCount,
        },
        {
            new: true
        }, (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        }
    )
    if(!cartItemPlusCount)
        return res
            .status(400)
            .json({
                msg: "No item found with this ID!"
            })     
    res.json(cartItemPlusCount);
})



router.post("/add", auth, async (req, res) => {
    try {
        const { name, category, available, use, count, price, uid, offer, dprice } = req.body;
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
        if (!dprice)
            return res.status(400).json({ msg: "Enter discount price!" });
        if (!offer) offer = "none";
        if (!use) use = "";
        
        console.log(req.body.dprice)
        const newCartItem = new Cart({
            name,
            category,
            available,
            use,
            count,
            price,
            offer,
            dprice,
            cookie: "cookieMonster",
            owner: req.user,
            uid,
        })
        const savedCartItem = await newCartItem.save();
        res.json(savedCartItem);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete("/deleteall", auth, async (req, res) => {
    try {
        await Cart.deleteMany({ owner: req.user}, err => {
            if (err) res.status(401).json({ error: err.message });
        });
    } catch (e) {
        res.status(401).json({ error: err.message });
    }
})
// :ID has to be last!
router.delete("/:id", auth, async (req, res) => {
    const cartItem = await Cart.findOne({_id: req.params.id, owner: req.user})
    if(!cartItem)
        return res
            .status(400)
            .json({
                msg: "No item found with this ID!"
            })
    const deletedCart = await Cart.findByIdAndDelete({_id: req.params.id, owner: req.user});        
    res.json(deletedCart);
})
module.exports = router