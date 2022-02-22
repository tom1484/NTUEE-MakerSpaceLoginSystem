const express = require("express")


const app = express()
// allow parsing json object
app.use(express.json())
app.use("/mks_access", require("./record_updater/router"))

app.listen(1484)



