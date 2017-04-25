import assert = require('assert')
import Parser from '../src/parser'


suite('parser', () => {})


test('parse', () => {
  const body = `
ABC=5
# Comment
DEF=hello
`
  assert.deepEqual({
    ABC: '5',
    DEF: 'hello'
  }, Parser.parse(body))
})