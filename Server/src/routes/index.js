import middleWare from "../controllers/middleWare.js";

import userController from "../controllers/userController.js";
import productController from "../controllers/productController.js";

let router = (app) => {
  //sign up
  app.post("/sign-up", userController.signUp);
  //login
  app.post("/login", userController.login);

  //product
  app.get(
    "/get-all-product",
    middleWare.verifyToken,
    productController.getAllProduct
  );

  app.post(
    "/add-new-product",
    middleWare.verifyToken,
    productController.addNewProduct
  );

  app.post(
    "/delete-product",
    middleWare.verifyToken,
    productController.deleteProduct
  );

  app.post(
    "/edit-product",
    middleWare.verifyToken,
    productController.editProduct
  );

  app.get(
    "/get-all-category",
    middleWare.verifyToken,
    productController.getAllCategory
  );

  app.post(
    "/get-product-by-category",
    middleWare.verifyToken,
    productController.getProductByCategory
  );

  app.post(
    "/get-product-by-search",
    middleWare.verifyToken,
    productController.getProductBySearch
  );

  //rate

  app.post("/get-rate", middleWare.verifyToken, productController.getRate);
  app.post("/send-rate", middleWare.verifyToken, productController.sendRate);
};

export default router;
