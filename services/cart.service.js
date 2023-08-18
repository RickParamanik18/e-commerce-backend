const cartRepo = require("../repositories/cart.repository");
const jwt = require("jsonwebtoken");

const getCart = async (params) => {
    const result = await cartRepo.getCart(params);
    return result;
};

const updateCart = async (params) => {
    try {
        let result = await cartRepo.updateCart(params);
        if (result.status == 400) return result;
        result.data = result.data.toObject();
        delete result.data.password;

        const token = jwt.sign(result.data, process.env.JWT_SECRET);

        return { ...result, token };
    } catch (err) {
        return {
            status: 400,
            msg: "something went wrong",
        };
    }
};

const addToCart = async (params) => {
    try {
        let result = await cartRepo.addToCart(params);
        if (result.status == 400) return result;

        result.data = result.data.toObject();
        delete result.data.password;

        const token = jwt.sign(result.data, process.env.JWT_SECRET);

        return { ...result, token };
    } catch (err) {
        return {
            status: 400,
            msg: "something went wrong",
        };
    }
};

const deleteFromCart = async (params) => {
    try {
        let result = await cartRepo.deleteFromCart(params);
        if (result.status == 400) return result;
        console.log({ result });

        result.data = result.data.toObject();
        delete result.data.password;

        const token = jwt.sign(result.data, process.env.JWT_SECRET);

        return { ...result, token };
    } catch (err) {
        console.log(err);
        return {
            status: 400,
            msg: "something went wrong",
        };
    }
};
module.exports = { getCart, addToCart, deleteFromCart, updateCart };
