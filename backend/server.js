const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/dbConnect")
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

mongoose.connection.on('open', () => {
    console.log("mongoDB CONNECTED")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})