const Product = require("../models/Product");
const Cart = require("../models/Cart");

const createNewProduct = async (req, res) => {
    try {
        const { name, color, picture, price } = req.body;
        if (!name || !color || !picture || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const prod = await Product.create({ name, color, picture, price });
        res.json(prod);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId, name, color, picture, price } = req.body;
        if (!productId || !name || !color || !picture || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name;
        product.color = color;
        product.picture = picture;
        product.price = price;
        const updatedProduct = await product.save();
        res.json(`'${updatedProduct.name}' updated`);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const cartWithProduct = await Cart.findOne({ prodId: id });
        if (cartWithProduct) {
            return res.status(400).json({ message: 'Cannot delete product. It is currently in use in a cart.' });
        }

        const product = await Product.findById(id);
        if (product) {
            await product.deleteOne();
            const reply = `Product '${product.name}' ID ${id} deleted`;
            res.json(reply);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
