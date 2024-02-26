require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors');
const app = express();
const mainRouter = require("./routes/user");
const UserModel = require('./models/User.js');

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);




// Import the User model correctly
const User = require('./models/User');

app.get('/getAllUser', async (req, res) => {
    try {
        // Access the User model and find all users
        const allUser = await User.find({});
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error); 
    }
};




start();
