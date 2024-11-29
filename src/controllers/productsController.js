const { currencyConverter } = require("../services/currencyConverter");
const { getDatabase } = require("../services/databaseConnector");
const { unitConverter } = require("../services/unitConverter");
const { currencyExists, categoryExists, productIdExists, unitExists } = require("../services/validation");


// async function getAllProducts (req, res) {
//     try {
//         const db = await getDatabase();
//         const products = await db.query("SELECT * FROM `products`;");
//         res.status(200).json({
//             message: "Successfully found products.",
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({message: "Unexpected error", data: [], error: error.toString()})
//     }
// }

async function getCategories (req, res) {
    try {
        const db = await getDatabase();
        const categories = await db.query("SELECT categories.id AS 'id', categories.name AS 'name', COUNT(furniture.category) AS 'products' FROM categories LEFT JOIN furniture ON categories.id = furniture.category GROUP BY categories.name;");
        res.status(200).json(
            {
                message: "Successfully retrieved categories.",
                data: categories
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                message: "Unexpected error",
                data: [],
                error: error.toString()
            }
        )
    }
}

async function getProducts (req, res) {
    try {
        const cat = parseInt(req.query.cat);
        const currency = req.query.currency;
        const inStockOnly = parseInt(req.query.instockonly);
        const db = await getDatabase();
        const category = await categoryExists(db, cat)

        if (category) {
            let products;
            let sql = "SELECT `id`, `price`, `stock`, `color` FROM `furniture` WHERE `category` = ?"
            
            if(inStockOnly) {
                if(inStockOnly === 1) {
                    products = await db.query(sql + " AND `stock` > 0", [ cat ]);
                } else {
                    return res.redirect(`/products${"?cat=" + cat}${currency ? "&currency=" + currency : ""}&instockonly=0`);
                }
            } else {
                products = await db.query(sql, [ cat ]);
            }

            if(currency) {
                if(currencyExists(currency)) {
                    products.forEach(product => {
                        product.price = currencyConverter(product, currency)
                    });
                } else {
                    res.status(400).json(
                        {
                            message: "Invalid currency",
                            data: []
                        }
                    )
                }
            }
            
            res.status(200).json(
                {
                    message: "Successfully retrieved products.",
                    data: products
                    
                }
            );
        } else {
            res.status(400).json(
                {
                    message: "Invalid category id",
                    data: []
                }
            )
        }
    } catch (error) {
        res.status(500).json(
            {
                message: "Unexpected error",
                data: [],
                error: error.toString()
            }
        )  
    }
}

async function getProduct (req, res) {
    try {
        const id = parseInt(req.query.id);
        const unit = req.query.unit;
        const currency = req.query.currency;
        const db = await getDatabase();
        const productExists = await productIdExists(db, id)

        if(productExists) {
            let product = await db.query("SELECT `category`, `width`, `height`, `depth`, `price`, `stock`, `related`, `color` FROM `furniture` WHERE `id` = ? LIMIT 1;", [ id ]);
            product = product[0]

            if(currency) {
                if(currencyExists(currency)) {
                    product.price = currencyConverter(product, currency)
                } else {
                    return res.status(400).json(
                        {
                            message: "Invalid currency",
                            data: []
                        }
                    )
                }
            }

            if(unit) {
                if(unitExists(unit)) {
                    product = unitConverter(product, unit)
                } else {
                    return res.status(400).json(
                        {
                            message: "Invalid unit",
                            data: []
                        }
                    )
                }
            }

            res.status(200).json({
                message: "Successfully retrieved product.",
                data: product
            });
        } else {
            res.status(400).json({
                message: "Invalid product id.",
                data: []
            });
        }
        
    } catch (error) {
        res.status(500).json(
            {
                message: "Unexpected error",
                data: [],
                error: error.toString()
            }
        ) 
    }
}

module.exports = {getCategories, getProducts, getProduct}