const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: {type: String, required: true}, // name of item
    //items: {type: Boolean, required: true}, // if item - testing smth
    category: {type: String, required: true}, // bike, trousers, etc...
    use: {type: String, required: false}, // old or new
    available: {type: Boolean, required: true}, // if available
    count: {type: Number, required: true}, // how many in package
    price: {type: Number, required: true}, // price of item
    uid: {type: String, required: true},
});

module.exports = Shop = mongoose.model("shop", shopSchema);