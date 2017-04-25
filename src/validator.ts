import fs = require('fs')
import { ISchema } from './types'


function run() {
  const schema = loadSchema()

  const invalid = []

  for (let name in schema.required) {
    if (!process.env[name] || process.env[name].length == 0) {
      const description = schema.required[name]
      invalid.push({ name, description })
    }
  }

  if (invalid.length > 0) {
    console.error('Gotenv: Missing the following required environment variables:')
    for (let variable of invalid) {
      console.log(`${variable.name}: ${variable.description}`)
    }
    console.error('Aborting...')
    process.exit()
  }
}


export default { run }


function loadSchema(): ISchema {
  const schema = JSON.parse(fs.readFileSync('package.json', 'utf-8')).env

  if (!schema) {
    console.error('Gotenv: Missing "env" key in package.json. Aborting...')
    process.exit()
  }

  if (!schema.required && !schema.optional) {
    console.error('Gotenv: "env" key in package.json must have a "required" or "optional" section. Aborting...')
    process.exit()
  }

  if (!schema.required) {
    schema.required = {}
  }

  if (!schema.optional) {
    schema.optional = {}
  }

  return schema
}