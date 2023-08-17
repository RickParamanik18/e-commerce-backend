const userRepo = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const login = async (params) => {
    try {
        let result = await userRepo.login(params);
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

const signin = async (params) => {
    try {
        let result = await userRepo.signin(params);
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

module.exports = { login, signin };
