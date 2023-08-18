const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
    const headerParams = req.headers;
    const result = await cartService.getCart(headerParams);
    res.send(result);
};

const addToCart = async (req, res) => {
    const headerParams = req.headers;

    const result = await cartService.addToCart(headerParams);
    result.status == 200 &&
        res.cookie("userData", result.token, { maxAge: 86400000 });
    res.send(result);
};

const updateCart = async (req, res) => {
    const headerParams = req.headers;

    const result = await cartService.updateCart(headerParams);
    result.status == 200 &&
        res.cookie("userData", result.token, { maxAge: 86400000 });
    res.send(result);
};

const deleteFromCart = async (req, res) => {
    const headerParams = req.headers;

    const result = await cartService.deleteFromCart(headerParams);
    result.status == 200 &&
        res.cookie("userData", result.token, { maxAge: 86400000 });
    res.send(result);
};

module.exports = { getCart, addToCart, deleteFromCart, updateCart };
