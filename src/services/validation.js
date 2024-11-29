function currencyExists (currency) {
    const currencies = ['GBP','USD','EUR','YEN','BUGATTI', 'USDEFENCE']
    return currencies.includes(currency.toUpperCase()) ? true : false
}

function unitExists (unit) {
    const units = ['mm','cm','in','ft','banana','rock']
    return units.includes(unit.toLowerCase()) ? true : false
}

async function categoryExists (db, cat) {
    const categoryExists = await db.query("SELECT 1 FROM `categories` WHERE `id` = ? LIMIT 1;", [ cat ])
    return categoryExists.length > 0 ? true : false
}

async function productIdExists (db, id) {
    const productExists = await db.query("SELECT 1 FROM `furniture` WHERE `id` = ? LIMIT 1;", [ id ])
    return productExists.length > 0 ? true : false
}

module.exports = { currencyExists, categoryExists, productIdExists, unitExists }