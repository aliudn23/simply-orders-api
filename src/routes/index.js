const router = require("express").Router();
const authModule = require("../modules/authentication");
const productModule = require("../modules/product");
const orderModule = require("../modules/order");

const middleware = require("../middleware/authgate");

// public route for login
router.post("/login", authModule.login);

// protected route to get current user info
router.use(middleware);

router.get("/me/:id", authModule.me);
router.post("/logout", authModule.logout);

router.get("/products", productModule.getAllProducts);
router.get("/products/:id", productModule.getProductById);
router.post("/products", productModule.createProduct);
router.put("/products/:id", productModule.updateProduct);
router.delete("/products/:id", productModule.deleteProduct);

router.post("/orders", orderModule.createOrder);
router.get("/orders/:id", orderModule.getOrderById);
router.get("/orders/user/:userId", orderModule.getOrdersByUserId);

module.exports = router;