const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const User = require('../src/models/user')
const path = require("path")
const userRouter = require('../src/router/user')
const adminroute = require('./admin/router/adminLogin')
const stateroute = require('./admin/router/state')
const propertyroute= require('./router/property')
const cityRoute= require('./admin/router/city')
const app= express()
const port=process.env.PORT||3000;
const contactRoute = require('./router/conatct')

app.use("/public",express.static(path.join(__dirname,"../public")))
app.use(cors())
app.use(express.json());

app.use(adminroute)
app.use(userRouter)
app.use(stateroute)
app.use(propertyroute)
app.use(contactRoute)
app.use(cityRoute)
module.exports = app
