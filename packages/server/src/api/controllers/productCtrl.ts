"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import productService from "../../services/productService";

class Product {
  static async create(req: Request, res: Response, next: NextFunction) {
    let productObj = req.body;
    let newEntry = null;

    try {
      const userInstance = Container.get(productService);
      newEntry = await userInstance.create(productObj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async getProductById(req, res) {}

  static async updateProductById(req, res) {}

  static async deleteProductById(req, res) {}

  static async getProducts(req, res) {}
}
