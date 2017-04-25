export interface IEnvMap {
  [name: string]: string
}


export interface ISchema {
  required: IEnvMap
  optional: IEnvMap
}