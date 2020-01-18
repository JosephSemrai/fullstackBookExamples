const palindrome = require('../utils/test_example').palindrome // Grabs the `palindrome` function from our 'for_testing' module

test('Palindrome of z', () => {
    const result = palindrome('z')

    expect(result).toBe('z')
})

test('Palindrome of test', () => {
    const result = palindrome('test')

    expect(result).toBe('tset')
})

test('Palindrome of palindrome', () => {
    const result = palindrome('palindrome')

    expect(result).toBe('emordnilap')
})

