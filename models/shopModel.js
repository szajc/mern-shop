const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: {type: String, required: true}, // name of item
    //items: {type: Boolean, required: true}, // if item - testing something
    category: {type: String, required: true}, // bike, trousers, etc...
    offer: {type: String, required: false}, // WoW price, black friday, none, etc... special offer
    use: {type: String, required: false}, // old or new
    available: {type: Boolean, required: true}, // if available
    count: {type: Number, required: true}, // how many in package
    price: {type: Number, required: true}, // price of item
    dprice: {type: Number, required: true}, // discount price of item
    uid: {type: String, required: true},
});

module.exports = Shop = mongoose.model("shop", shopSchema);