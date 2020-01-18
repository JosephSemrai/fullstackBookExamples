const average = require('../utils/test_example').average

describe('Average', () => {
  test('of one value is the same value', () => {
    expect(average([1])).toBe(1)
  })

  test('of many', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of an empty array is 0', () => {
    expect(average([])).toBe(0)
  })
})