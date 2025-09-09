const Cart = require("../models/Cart");

const AddCart = async (req, res) => {
    try {
        const { prodId } = req.body;
        const userId = req.user._id;

        if (!prodId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const cart = await Cart.create({
            userId: userId,
            prodId: prodId
        });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const DeleteCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { prodId } = req.body;

        if (!prodId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const carts = await Cart.findOne({ userId: userId, prodId: prodId });
        if (!carts) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await carts.deleteOne();

        const reply = `Product '${prodId}' deleted`;
        res.json({ message: reply });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const GetAllCart = async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.user._id }).populate('prodId');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { AddCart, DeleteCart, GetAllCart };
