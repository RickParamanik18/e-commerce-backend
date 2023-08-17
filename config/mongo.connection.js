const mongoose = require("mongoose");
const con = mongoose.createConnection("mongodb://localhost:27017/e_commerce");
module.exports = con;
