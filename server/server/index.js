require("dotenv").config();

const express = require("express");
const cors = require('cors')
const app = express()

// database initializaion
const db = require('./Config/db')



//middelware initialization
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const userRoute = require('./Routes/UserRoutes')
const TaskRoute = require('./Routes/TaskRoutes')


app.use("/api/user", userRoute)
app.use("/api/task", TaskRoute)

  


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to server"
    })
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`server running at port ${process.env.PORT || 5000}`);
}); 