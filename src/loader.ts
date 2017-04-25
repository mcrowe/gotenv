import fs = require('fs')
import { IEnvMap } from './types'
import Parser from './parser'


const ENCODING = 'utf8'
const ENV_PATH = '.env'
const ENV_TEST_PATH = '.env.test'


function run() {
  const path = getFilePath()

  if (path) {
    const body = fs.readFileSync(path, ENCODING)
    const map = parseSafe(path, body)
    mergeEnvMap(map)
  }
}


function getFilePath(): string | undefined {
  if (isTestEnvironment() && fs.existsSync(ENV_TEST_PATH)) {
    return ENV_TEST_PATH
  } else if (fs.existsSync(ENV_PATH)) {
    return ENV_PATH
  }
}


function parseSafe(path: string, body: string): IEnvMap {
  try {
    return Parser.parse(body)
  } catch (e) {
    console.error(`Gotenv found that your ${path} file was invalid. Aborting...`)
    process.exit()
  }
}


function isTestEnvironment(): boolean {
  return process.env.NODE_ENV == 'test'
}


function mergeEnvMap(map: IEnvMap) {
  for (let key in map) {
    process.env[key] = map[key] || process.env[key]
  }
}


export default { run, parseEnvMap }