import { Product } from "../models/product.js";

export const productIndex = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const productStore = async (req, res) => {
  const { description, brand, price, quantityStock } = req.body;

  try {
    const newProduct = await Product.create({
      description,
      brand,
      price,
      quantityStock
    })

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { price, quantityStock } = req.body;

  try {
    const updateProductInfo = await Product.update({ price, quantityStock }, { where: { id } })

    const productUpdated = await Product.findOne({ where: { id } });

    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const productDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findOne({ where: { id } });

    await Product.destroy({ where: { id } }, { trucate: true });

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json(error)
  }
};

export const productSearch = async (req, res) => {
  const { id } = req.params;

  try {
    const productFind = await Product.findOne({ where: { id } });
    let message = "Este produto não existe.";

    if (productFind == null) {
      res.status(200).json({ message });
    } else {
      res.status(200).json(productFind);
    }

  } catch (error) {
    res.status(400).json(error)
  }
}

export const stockStats = async (req, res) => {
  const products = await Product.findAll()

  let totalStock = 0

  products.forEach(product => {
    totalStock += product.quantityStock
  })

  try {
    const productCount = (await Product.findAndCountAll()).count

    res.status(200).json({productCount, totalStock});
  } catch (error) {
    res.status(400).json(error);
  }
}