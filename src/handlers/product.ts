import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Product from "../models/Product.model";

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }
  res.json({
    data: product,
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [
      ["id", "DESC"],
      // ['price', 'DESC']
    ],
    // limit: 2,
    attributes: {
      exclude: ["createdAt", "updatedAt", "availability"],
    },
  });
  res.json({
    data: products,
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  // const product = new Product(req.body);
  // const savedProduct = await product.save();

  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  // Revisar si el producto existe
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }

  // Actualizar
  await product.update(req.body);
  await product.save();

  // Respuesta
  res.json({
    data: product,
  });
};

export const updateAvailability = async (req: Request, res: Response) => {
  // Revisar si el producto existe
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }

  // Actualizar
  product.availability = !product.dataValues.availability;
  //   await product.update(req.body);
  await product.save();

  // Respuesta
  res.json({
    data: product,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: "Producto No Encontrado",
      });
    }

    await product.destroy();

    res.json({ data: "Producto eliminado" });
};
