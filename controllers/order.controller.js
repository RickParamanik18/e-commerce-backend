const orderService = require("../services/order.service");

const placeOrder = async (req, res) => {
    const headerParams = req.headers;

    const result = await orderService.placeOrder(headerParams);
    result.status == 200 &&
        res.cookie("userData", result.token, { maxAge: 86400000 });
    res.send(result);
};

const orderHistory = async (req, res) => {
    const headerParams = req.headers;
    const result = await orderService.orderHistory(headerParams);
    res.send(result);
};

const orderDetail = async (req, res) => {
    const headerParams = req.headers;
    const result = await orderService.orderDetail(headerParams);
    res.send(result);
};

module.exports = {
    placeOrder,
    orderHistory,
    orderDetail,
};
