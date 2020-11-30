const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    email: {type: String, required: true}, // name of item MUST be UNIQUE
});

module.exports = News = mongoose.model("news", newsSchema);