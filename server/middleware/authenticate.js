const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ status: 401, message: "No token provided" });
        }

        const decoded = jwt.verify(token, keysecret);
        const rootUser = await userdb.findOne({ _id: decoded._id });

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: 401, message: 'Token has expired' });
        }
        res.status(401).json({ status: 401, message: "Unauthorized: Invalid token" });
    }
};

module.exports = authenticate;
