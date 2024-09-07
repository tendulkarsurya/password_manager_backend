const express = require('express')
const http = require("http") 
const DB = require('./Config/DataBase')
const morgan = require('morgan')
const UserAuth = require('./Router/UserAuth')
const UserData1 = require('./Router/UserData1')

const cors = require("cors")


require('dotenv').config()



const app = express()

app.use(express.json())
app.use(cors())  
app.use(morgan('dev'))
app.get('/',(req,res)=>{
    res.send(`<marquee style=" margin:100px; border:2px dotted black ;border-radius:12px" > <h1 style="padding:20px ;" > My App Backend is Running </h1> </marquee>`)
})
app.use("/api",UserAuth)
app.use("/api",UserData1)


let server = http.createServer(app) 
let port =process.env.port
server.listen(port,()=>{
    console.log(`The Server is Running in the port ${port}`,);
})
