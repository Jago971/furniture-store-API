const { unitConverter } = require("../src/services/unitConverter.js");

describe('unit conversion tests', () => {

    test('convert to mm', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: 100, height: 100, depth: 100}
        expect( unitConverter(actual, 'mm') ).toEqual(expected)
    })

    test('convert to cm', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: '10', height: '10', depth: '10'}
        expect( unitConverter(actual, 'cm') ).toEqual(expected)
    })

    test('convert to in', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: '3.94', height: '3.94', depth: '3.94'}
        expect( unitConverter(actual, 'in') ).toEqual(expected)
    })

    test('convert to ft', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: '0ft 4in', height: '0ft 4in', depth: '0ft 4in'}
        expect( unitConverter(actual, 'ft') ).toEqual(expected)
    })

    test('convert to bananas', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: '0.44 bananas', height: '0.44 bananas', depth: '0.44 bananas'}
        expect( unitConverter(actual, 'banana') ).toEqual(expected)
    })

    test('convert to rocks', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: 'At least 1 rock.', height: 'At least 1 rock.', depth: 'At least 1 rock.'}
        expect( unitConverter(actual, 'rock') ).toEqual(expected)
    })

    test('convert to MM upper case', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: 100, height: 100, depth: 100}
        expect( unitConverter(actual, 'MM') ).toEqual(expected)
    })

    test('not a valid unit', () => {
        const actual = {width: 100, height: 100, depth: 100}
        const expected = {width: 'NaN', height: 'NaN', depth: 'NaN'}
        expect( unitConverter(actual, "fgh") ).toEqual(expected)
    })

    test('malformed unit', () => {
        const actual = () => {unitConverter({width: 100, height: 100, depth: 100}, 123)}
        expect( actual ).toThrow(TypeError)
    })
})