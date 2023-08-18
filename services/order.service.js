const orderRepo = require("../repositories/order.repository");
const jwt = require("jsonwebtoken");

const placeOrder = async (params) => {
    try {
        let result = await orderRepo.placeOrder(params);
        if (result.status == 400) return result;
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

const orderHistory = async (params) => {
    let result = await orderRepo.orderHistory(params);
    return result;
};

const orderDetail = async (params) => {
    let result = await orderRepo.orderDetail(params);
    return result;
};

module.exports = {
    placeOrder,
    orderHistory,
    orderDetail,
};
