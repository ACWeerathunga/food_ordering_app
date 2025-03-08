import Product from "../models/product.js";

export function createProduct(req, res) {
    console.log("User data:", req.user); // Debugging log to check req.user

    if (!req.user) {  // Fix: Properly checking if req.user is undefined or null
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }
    
    if (req.user.role !== "admin") {  // Fix: Corrected comparison operator
        res.status(403).json({
            message: "You are not authorized to create a product"
        });
        return;
    }

    const product = new Product(req.body);
    product.save().then(
        () => {
            res.json({
                message: "Product saved successfully"
            });
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).json({
                message: "Product not saved"
            });
        }
    );
}

export function getProducts(req, res) {
    Product.find().then(
        (products) => {
            res.json(products);
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "Products not found"
            });
        }
    );
}

export function deleteProduct(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "You need to login first" });
    }
    
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to delete a product" });
    }

    Product.findOneAndDelete({ productId: req.params.productId }) // Corrected: Changed `product` to `Product`
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        })
        .catch((err) => {
            console.error("Error deleting product:", err);
            res.status(500).json({ message: "Product not deleted", error: err.message });
        });
}
 export function updateProduct(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "You need to login first" });
    }
    
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to update a product" });
    }

    Product.findOneAndUpdate(
        { productId: req.params.productId },
        req.body,
        { new: true }  // Ensures that the updated document is returned
    ).then((updatedProduct) => {
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully", updatedProduct });
    })
    .catch((err) => {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Product not updated", error: err.message });
    });
}
