function currencyConverter (product, currency = "GBP") {
    if(product.price < 0) {
        throw new Error('Negative price not possible!')
    }
    currency = currency.toUpperCase();

    const currencies = {
        GBP: 1,
        USD: 1.25,
        EUR: 1.15,
        YEN: 162.5,
        BUGATTI: 0.0000002857,
        USDEFENCE: 0.00000000152
    };
    
    if(currency !== 'YEN' && currency !== 'BUGATTI' && currency !== 'USDEFENCE') {
        return Math.round((product.price * currencies[currency]) * 100) / 100
    } else if(currency === 'YEN') {
        return Math.round((product.price * currencies[currency]))
    } else if(currency === 'BUGATTI') {
        return `${(product.price * currencies[currency]).toFixed(6)} Bugattis`
    } else {
        return `${(product.price * currencies[currency]).toFixed(9)} US defence budgets`
    }
}

module.exports = { currencyConverter }