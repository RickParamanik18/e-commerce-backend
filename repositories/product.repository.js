const products = require("../models/product.model");

const getProduct = async (params) => {
    try {
        const { _id } = params;
        let data = null;
        if (_id) {
            data = await products.findOne({ _id });
        } else {
            data = await products.find();
        }
        return data
            ? { status: 200, msg: "success", data }
            : { status: 400, msg: "failed", data };
    } catch (err) {
        console.log(err);
        return {
            status: 400,
            data: null,
            msg: "something went wrong",
        };
    }
};

const getCategory = async (params) => {
    try {
        const { category } = params;
        let data = null;

        if (category) {
            data = await products.find({ category });
        } else {
            data = await products.distinct("category");
        }
        return data
            ? { status: 200, msg: "success", data }
            : { status: 400, msg: "failed", data };
    } catch (err) {
        return {
            status: 400,
            msg: "something went wrong",
            data: null,
        };
    }
};

module.exports = {
    getProduct,
    getCategory,
};
