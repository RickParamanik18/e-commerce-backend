const users = require("../models/user.model");

const getCart = async (params) => {
    try {
        const { userData } = params;
        const user = await users.findOne({ _id: userData._id });

        return user
            ? { status: 200, msg: "success", data: user.cart }
            : { status: 400, msg: "failed", data: null };
    } catch (err) {
        return {
            status: 400,
            data: null,
            msg: "something went wrong",
        };
    }
};

const addToCart = async (params) => {
    try {
        const { productid: prodId, quantity, userData } = params;

        const isAdded = await users.findOne({
            _id: userData._id,
            "cart.prodId": prodId,
        });
        if (isAdded)
            return {
                status: 400,
                msg: "this product is already added!!",
                data: null,
            };

        const result = await users.updateOne(
            { _id: userData._id },
            {
                $push: {
                    cart: { prodId, quantity },
                },
            }
        );

        return {
            status: 200,
            data: await users.findOne({ _id: userData._id }),
            msg: "product added to cart",
        };
    } catch (err) {
        console.log(err);
        return {
            status: 400,
            msg: "something went wrong",
            data: null,
        };
    }
};

const deleteFromCart = async (params) => {
    try {
        const { productid: prodId, userData } = params;

        const isAdded = await users.findOne({
            _id: userData._id,
            "cart.prodId": prodId,
        });
        if (!isAdded)
            return {
                status: 400,
                msg: "this product is not in cart!!",
                data: null,
            };

        const result = await users.updateOne(
            { _id: userData._id },
            {
                $pull: {
                    cart: { prodId },
                },
            }
        );

        return {
            status: 200,
            data: await users.findOne({ _id: userData._id }),
            msg: "product removed from cart",
        };
    } catch (err) {
        return {
            status: 400,
            data: null,
            msg: "something went wrong",
        };
    }
};

const updateCart = async (params) => {
    try {
        const { productid: prodId, quantity, userData } = params;

        const isAdded = await users.findOne({
            _id: userData._id,
            "cart.prodId": prodId,
        });
        if (!isAdded)
            return {
                status: 400,
                msg: "this product is not in cart!!",
                data: null,
            };

        let { cart } = await users.findOne({ _id: userData._id });

        cart.forEach((cartItem) => {
            if (cartItem.prodId === prodId) cartItem.quantity = quantity;
        });

        const result = await users.updateOne(
            { _id: userData._id },
            {
                $set: {
                    cart,
                },
            }
        );

        return {
            status: 200,
            data: await users.findOne({ _id: userData._id }),
            msg: "cart updated!!",
        };
    } catch (err) {
        return {
            status: 400,
            msg: "something went wrong",
            data: null,
        };
    }
};

module.exports = { getCart, addToCart, deleteFromCart, updateCart };
