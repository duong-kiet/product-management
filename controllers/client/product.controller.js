const Product = require("../../models/product.model");

// GET
module.exports.index  = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    for (const item of products) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    console.log(products);
    
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        products: products
    });
}
