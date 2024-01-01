const express = require("express");
// cors allow to communicate with frontEnd
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute')

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute)
//CRUD 
app.get('/', (req, res)=>{
    res.send("Welcome to my chat App Apis...")
});

app.listen(3010, (req, res) => {
  console.log("Server running on the port 3010");
});

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDb connection established"))
  .catch((error) => console.log("Mongodb connection failed:", error.message));
