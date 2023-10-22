const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router imports
const userRoutes = require("./routes/userRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})