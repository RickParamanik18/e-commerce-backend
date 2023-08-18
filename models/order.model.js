const con = require("../config/mongo.connection");
const mongoose = require("mongoose");
const cartSchema = require("./cart.model");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    detail: {
        type: [cartSchema],
        required: true,
    },
});

module.exports = con.model("orders", orderSchema);
