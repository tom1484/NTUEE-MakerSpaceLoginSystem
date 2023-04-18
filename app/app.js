const express = require("express")
const app = express()
// init middleware

// app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://140.112.194.49:8083')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

// allow parsing json object
app.use(express.json())
app.use("/mks_access", require("./routers/statistics"))
app.use("/mks_access", require("./routers/update"))
app.use("/mks_access", require("./routers/register"))
app.use("/mks_access", require("./routers/modify"))

app.listen(1484)

