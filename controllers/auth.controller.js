const authService = require("../services/auth.service");

const login = async (req, res) => {
    const headerParams = req.headers;

    const result = await authService.login(headerParams);
    result.status == 200 &&
        res.cookie("userData", result.token, { maxAge: 86400000 });
    res.send(result);
};

const signin = async (req, res) => {
    const headerParams = req.headers;

    const result = await authService.signin(headerParams);
    result.status == 200 &&
        res.cookie("userData", result.token, { maxAge: 86400000 });
    res.send(result);
};

const logout = async (req, res) => {
    res.clearCookie("userData");
    res.send({
        status: 200,
        msg: "logout successful",
    });
};

module.exports = { login, signin, logout };
