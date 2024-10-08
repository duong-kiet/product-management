const homeRoute = require("./home.route.js")
const productRoute = require("./product.route.js")
const searchRoute = require("./search.route.js")
const cartRoute = require("./cart.route.js")
const checkoutRoute = require("./checkout.route.js")
const userRoute = require("./user.route.js")

const categoryMiddleware = require("../../middlewares/client/category.middleware.js")
const cartMiddleware = require("../../middlewares/client/cart.middleware.js")
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports.index = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId)
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.setting);

    app.use("/", homeRoute);
    // app.get("/", homeRoute); neu dung get thi tat ca thang con cua no cung se la get 
    
    app.use("/products", productRoute); // khi dung /products thi se chay vao day 
    // app.get("/products", productRoute);

    app.use("/search", searchRoute)

    app.use("/cart", cartRoute)

    app.use("/checkout", checkoutRoute)

    app.use("/user", userRoute)
}
 // tuong tuong nhu const index ( cho nao const thay bang module.exports)

 // maybe co the /products/edit , /products/detail ( mot producs co the chua hang tram route )
