const con = require("../config/mongo.connection");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = require("./cart.model");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: [cartSchema],
        default: [],
    },
    orders: {
        type: [String],
        default: [],
    },
});

module.exports = con.model("users", userSchema);
