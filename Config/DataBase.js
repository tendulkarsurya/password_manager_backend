const mongoose = require('mongoose');
require("dotenv").config();
const DB = mongoose.connect(
    process.env.DataBase
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }
)
.then((res) => console.log("DB is Connected....!"))
.catch((err) => console.error("DB is not Connected", err));

module.exports = DB;
