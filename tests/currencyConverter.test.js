const { currencyConverter } = require("../src/services/currencyConverter.js");

describe('currency conversion tests', () => {

    test('convert to GBP', () => {
        const actual = {price: 100}
        const expected = 100
        expect( currencyConverter(actual, "GBP") ).toEqual(expected)
    })

    test('convert to USD', () => {
        const actual = {price: 100}
        const expected = 125
        expect( currencyConverter(actual, "USD") ).toEqual(expected)
    })

    test('convert to EUR', () => {
        const actual = {price: 100}
        const expected = 115
        expect( currencyConverter(actual, "EUR") ).toEqual(expected)
    })

    test('convert to YEN', () => {
        const actual = {price: 100}
        const expected = 16250
        expect( currencyConverter(actual, "YEN") ).toEqual(expected)
    })

    test('convert to BUGATTIs', () => {
        const actual = {price: 100}
        const expected = '0.000029 Bugattis'
        expect( currencyConverter(actual, "BUGATTI") ).toEqual(expected)
    })

    test('convert to US Defence Budgets', () => {
        const actual = {price: 100}
        const expected = '0.000000152 US defence budgets'
        expect( currencyConverter(actual, "USDEFENCE") ).toEqual(expected)
    })

    test('convert to gbp lower case', () => {
        const actual = {price: 100}
        const expected = 100
        expect( currencyConverter(actual, "gbp") ).toEqual(expected)
    })

    test('not a valid currency', () => {
        const actual = {price: 100}
        const expected = NaN
        expect( currencyConverter(actual, "fgh") ).toEqual(expected)
    })

    test('malformed currency', () => {
        const actual = () => {currencyConverter({price: 100}, 123)}
        expect( actual ).toThrow(TypeError)
    })
})