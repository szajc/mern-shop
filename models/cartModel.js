const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    name: {type: String, required: true}, // name of item MUST be UNIQUE
    //items: {type: Boolean, required: true}, // if item - testing smth
    category: {type: String, required: true}, // bike, trousers, etc...
    use: {type: String, required: false}, // old or new
    available: {type: Boolean, required: true}, // if available
    count: {type: Number, required: true}, // how many in package
    price: {type: Number, required: true}, // price of item
    dprice: {type: Number, required: true}, // discount price of item
    cookie: {type: String, required: false}, // if cookie
    owner: {type: String, required: false}, // if owner
    uid: {type: String, required: true}, // unique id that stays!
});

module.exports = Cart = mongoose.model("cart", cartSchema);