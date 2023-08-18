const productService = require("../services/product.service");

const getProduct = async (req, res) => {
    const headerParams = req.headers;
    const result = await productService.getProduct(headerParams);
    res.send(result);
};

const getCategory = async (req, res) => {
    const headerParams = req.headers;
    const result = await productService.getCategory(headerParams);
    res.send(result);
};

module.exports = { getProduct, getCategory };
