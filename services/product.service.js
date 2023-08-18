const productRepo = require("../repositories/product.repository");

const getProduct = async (params) => {
    let result = await productRepo.getProduct(params);
    return result;
};

const getCategory = async (params) => {
    let result = await productRepo.getCategory(params);
    return result;
};

module.exports = { getProduct, getCategory };
