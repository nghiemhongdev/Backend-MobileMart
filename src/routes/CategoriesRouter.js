const CategoryController = require("../controllers/CategoriesController.js");
const express = require("express");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware.js");
const checkExistence = require("../middleware/checkExistMiddleware.js");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkExistence("categories", "name"),
  CategoryController.createCategory
);

router.put("/update/:id", CategoryController.UpdateCategory);
router.delete("/delete/:id", CategoryController.DeleteCategory);
router.get("/getAll/", CategoryController.GetAllCategory);
router.get("/getById/:id", CategoryController.GetCategoryById);

module.exports = router;
