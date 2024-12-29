import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  // Validacion
  body("name").notEmpty().withMessage("El Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("El precio del producto debe ser numerico")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),

  handleInputErrors,

  createProduct
);

// PUT: Actualización y/o reemplazo de los datos del elemento completamente
router.put(
  "/:id",
  // Validacion
  param("id").isInt().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("El precio del producto debe ser numerico")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido."),
  handleInputErrors,
  updateProduct
);

//PATCH: Actualización de datos puntuales
router.patch(
  "/:id",
  // Validacion
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  updateAvailability
);

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router;
