const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const data = jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET
            );

            req.headers = { ...req.headers, userData: data };
            next();
        } else {
            res.send({
                status: 400,
                msg: "authorization token not found",
            });
        }
    } catch (err) {
        res.send({
            status: 400,
            msg: "authorization failed",
        });
    }
};

module.exports = { isAuthorized };
