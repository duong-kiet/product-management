const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree.helper")

// GET /admin/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh muc san pham",
        records: records
    });
}

// GET /admin/products-category/create
module.exports.create = async (req, res) => {
    const categories = await ProductCategory.find({
        deleted: false,
    })

    const newCategories = createTreeHelper(categories)

    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Them moi danh muc san pham",
        categories: newCategories
    });
}

// POST /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countCategory = await ProductCategory.countDocuments({}); // đếm ra tất cả bản ghi 
        req.body.position = countCategory + 1;
    }
    
    const newCategory = new ProductCategory(req.body);
    await newCategory.save();
  
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`)
}

// GET /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const category = await ProductCategory.findOne({
        _id: id,
        deleted: false
    })

    const categories = await ProductCategory.find({
        deleted: false,
    })

    const newCategories = createTreeHelper(categories)

    res.render("admin/pages/products-category/edit.pug", {
        pageTitle: "Chinh sua danh muc san pham",
        categories: newCategories,
        category: category
    });
}

// PATCH /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countCategory = await ProductCategory.countDocuments({}); // đếm ra tất cả bản ghi 
        req.body.position = countCategory + 1;
    }
    
    await ProductCategory.updateOne({
        _id: id,
        deleted: false
    }, req.body);

    req.flash("success", "Cập nhập danh mục thành công")

    res.redirect('back')
}