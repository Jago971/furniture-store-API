function unitConverter (product, unit = "mm") {
    unit = unit.toLowerCase();

    const units = {
        mm: 1,
        cm: 0.1,
        in: 0.0393701,
        banana: 0.00436,
    };
    
    if(unit === "mm") {
        return product
    } else if(unit !== 'ft' && unit !== 'rock') {
        product.width = `${Math.round((product.width * units[unit]) * 100 ) / 100}${unit === 'banana' ? " bananas" : ""}`
        product.height = `${Math.round((product.height * units[unit]) * 100 ) / 100}${unit === 'banana' ? " bananas" : ""}`
        product.depth = `${Math.round((product.depth * units[unit]) * 100 ) / 100}${unit === 'banana' ? " bananas" : ""}`
    } else if(unit !== 'rock'){
        function convertFoot (dimension) {
            const totalInches = dimension * units.in
            const feet = Math.floor(totalInches / 12)
            const inches = Math.round(totalInches % 12)
            return `${feet}ft ${inches}in`
        }
        product.width = convertFoot(product.width)
        product.height = convertFoot(product.height)
        product.depth = convertFoot(product.depth)
    } else {
        product.width = "At least 1 rock."
        product.height = "At least 1 rock."
        product.depth = "At least 1 rock."
    }

    return product
}

module.exports = { unitConverter }