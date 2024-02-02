const Product = require('../models/productModel');


const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.productId,
//       req.body,
//       { new: true } // Return the updated document
//     );
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     // Check if another entry already exists
//     const existingProduct = await Product.findOne({ /* Your condition to check if another entry exists */ });

//     if (existingProduct) {
//       // If another entry exists, create a new entry with existing and new data
//       const newProduct = new Product({
//         // Combine existingProduct data with req.body data as needed
//         price: req.body.price || existingProduct.price,
//         description: req.body.description || existingProduct.description,
//         name: req.body.name || existingProduct.name,
//         // Add other fields as needed
//       });

//       // Save the new product entry
//       const savedProduct = await newProduct.save();
//       res.status(200).json(savedProduct);
//     } else {
//       // If no other entry exists, update the existing product
//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.productId,
//         {
//           // Ensure req.body contains all required fields
//           price: req.body.price,
//           description: req.body.description,
//           name: req.body.name,
//           // Add other fields as needed
//         },
//         { new: true } // Return the updated document
//       );

//       res.status(200).json(updatedProduct);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const updateProduct = async (req, res) => {
  try {
    // Check if another entry already exists
    const existingProduct = await Product.findById(req.params.productId);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if variants are present in the request body
    if (req.body.variants && req.body.variants.length > 0) {

      // If variants are present and valid, update the existing product with the new data
      existingProduct.name = req.body.name || existingProduct.name;
      existingProduct.description = req.body.description || existingProduct.description;
      existingProduct.price = req.body.price || existingProduct.price;

      // Update variants array with new data
      existingProduct.variants = existingProduct.variants.concat(
        req.body.variants.map((variant) => ({
          name: variant.name || '',
          description: variant.description || '',
          price: variant.price || 0,
          sku: variant.sku,
        }))
      );
      

      // Save the updated product
      const updatedProduct = await existingProduct.save();
      return res.status(200).json(updatedProduct);
    } else {
      // If no variants are present, update only the main product data
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        {
          name: req.body.name || existingProduct.name,
          description: req.body.description || existingProduct.description,
          price: req.body.price || existingProduct.price,
        },
        { new: true } // Return the updated document
      );

      return res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};






const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).send(); // No content after successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchProducts = async (req, res) => {
  try {
    const query = req.body.query;
    
    // Ensure that the query parameter is not empty
    if (!query) {
      return res.status(400).json({ error: 'Bad Request: Missing query parameter' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'variants.name': { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  
};
