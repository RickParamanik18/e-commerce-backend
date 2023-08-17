const users = require("../models/user.model");

const login = async (params) => {
    try {
        const result = await users.findOne({ email: params.email });

        if (!result)
            return { status: 400, data: null, msg: "Wrong credentials!!" };

        if (result && result.password === params.password)
            return { status: 200, data: result, msg: "login successfull!!" };
        else return { status: 400, data: null, msg: "Wrong credentials!!" };
    } catch (err) {
        return {
            status: 400,
            data: null,
            msg: "something went wrong",
        };
    }
};

const signin = async (params) => {
    try {
        const { name, email, password } = params;
        let result = await users.findOne({ email });
        if (result)
            return {
                status: 400,
                msg: "email already registered!!",
                data: null,
            };

        const newUser = new users({
            name,
            email,
            password,
        });

        result = await newUser.save();
        return {
            status: 200,
            data: result,
            msg: "email register successful!!",
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
    login,
    signin,
};
