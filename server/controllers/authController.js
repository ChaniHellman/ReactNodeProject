const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const foundUser = await User.findOne({ username: username }).lean();
        if (!foundUser || !foundUser.active) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userInfo = {
            _id: foundUser._id,
            name: foundUser.name,
            username: foundUser.username,
            roles: foundUser.roles,
            email: foundUser.email
        };
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const register = async (req, res) => {
    try {
        const { username, password, name, email, phone } = req.body;
        if (!username || !password || !name || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const duplicateUser = await User.findOne({ username: username }).lean();
        if (duplicateUser) {
            return res.status(409).json({ message: "Duplicate user" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashPassword, name, email, phone });
        if (!user) {
            return res.status(400).json({ message: "Bad request" });
        }

        res.json({ message: `User ${user.name}, created` });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, register };
