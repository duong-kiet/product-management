const express = require("express")
const multer  = require('multer')

const router = express.Router();
    
const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/admin/product.validate.js");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")

// const upload = multer({ dest: './public/uploads/' }) // up ảnh vào thư mục này 

// const storageMulterHelper = require("../../helpers/storageMulter.helper"); dùng cho local host

// const upload = multer({ storage: storageMulterHelper.storage }) dùng cho local host

const upload = multer();

// admin/products
router.get("/", controller.index);  

router.patch("/change-status/:statusChange/:id", controller.changeStatus);  // : cho thằng động

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

// router.patch("/trash", controller.trash);

router.patch("/change-position/:id", controller.changePosition);

router.get("/create", controller.create); 

router.post(
    "/create", 
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost, 
    controller.createPost
); // truyền ô input mà ta muốn lấy 

router.get("/edit/:id", controller.edit); // Lấy ra giao diện cho trang chỉnh sửa 

router.patch(
    "/edit/:id", 
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost, 
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;
   