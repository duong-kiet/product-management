const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');

const database = require("./config/database.js");
database.connect();

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const systemConfig = require("./config/system.js")

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// Flash
app.use(cookieParser('ASDFGHJKL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set("views",`${__dirname}/views`); // đến thư mục views 
app.set("view engine", "pug");

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce'))); // dirname: đường dẫn của thư mục gốc ( ở đây là product-management)

app.use(express.static(`${__dirname}/public`));  // biến thư mục public thành thư mục static có thể truy cập bởi người dùng

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app); // kieu goi ham index cua routeClient 


app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
      pageTitle: "404 Not Found"
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

