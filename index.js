const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRouter")
const shopRoutes = require("./routes/shopRouter")
const cartRoutes = require("./routes/cartRouter")
const newsRoutes = require("./routes/newsRouter")
const path = require('path');



// set up express

const app = express();
app.use(express.json());
app.use(cors());

// lets say heroku has port enabled it assigns PORT 
// othervise its gonna take port-5000
const PORT = process.env.PORT || 5000;

// set up mongoose
mongoose.connect( process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established!")
})

// set up routes 

app.use("/users", userRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/news", newsRoutes);
//NODE_ENV=production in .env file
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build' )));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + 'frontend/build/index.html' )); // relative path 
    })
}

app.listen(PORT, () => console.log("The server has started on PORT: " + PORT));