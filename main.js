const express = require("express");
const cors = require("cors");
const { getCategories, getProducts, getProduct } = require("./src/controllers/productsController");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// app.get('/products', getAllProducts)

app.get('/categories', getCategories)

app.get('/products', getProducts)

app.get('/product', getProduct)

app.listen(port);