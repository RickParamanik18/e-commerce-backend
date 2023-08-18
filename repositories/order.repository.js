const users = require("../models/user.model");
const orders = require("../models/order.model");

const placeOrder = async (params) => {
    try {
        const { userData } = params;
        const user = await users.findOne({ _id: userData._id });
        const cart = user.cart;

        //actual code for placing order

        if (!cart.length)
            return {
                status: 400,
                data: null,
                msg: "cart is empty cant place order",
            };

        const newOrder = new orders({
            detail: cart,
        });
        const result = await newOrder.save();

        if (result) {
            const updateResult = await users.updateOne(
                { _id: userData._id },
                {
                    $set: {
                        cart: [],
                    },
                    $push: {
                        orders: result._id,
                    },
                }
            );
            if (updateResult.acknowledged) {
                return {
                    status: 200,
                    data: await users.findOne({ _id: userData._id }),
                    msg: "order placed!!",
                };
            }
        }
        return {
            status: 400,
            data: null,
            msg: "something went wrong",
        };
    } catch (err) {
        return {
            status: 400,
            data: null,
            msg: "something went wrong",
        };
    }
};

const orderHistory = async (params) => {
    try {
        const { userData } = params;
        const user = await users.findOne({ _id: userData._id });
        const orderIds = user.orders;
        const result = await orders.find({ _id: { $in: orderIds } });

        return {
            status: 200,
            msg: "success",
            data: result,
        };
    } catch (err) {
        return {
            status: 400,
            msg: "something went wrong",
            data: null,
        };
    }
};
const orderDetail = async (params) => {
    try {
        const { orderid: orderId } = params;
        const result = await orders.findOne({ _id: orderId });

        return {
            status: 200,
            msg: "success",
            data: result,
        };
    } catch (err) {
        return {
            status: 400,
            msg: "something went wrong",
            data: null,
        };
    }
};
module.exports = {
    placeOrder,
    orderHistory,
    orderDetail,
};
