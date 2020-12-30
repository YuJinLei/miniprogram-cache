import { MiniCacheType } from '../constants'

declare type CommonType<T> = {
  get: () => T
  set: (value: T) => void
  clear: () => void
}
declare type MapTypeValue = string | boolean | number | object | any[]
declare type MapType<T> = {
  getMap: (key: string) => T
  setMap: (key: string, value: T) => void
  clearMap: (key: string) => void
}
declare type Type = {
  string: CommonType<string>
  boolean: CommonType<boolean>
  number: CommonType<number>,
  object: CommonType<object>,
  array: CommonType<any[]>,
  map: (type: MiniCacheType) => MapType<MapTypeValue>
}

export const type: Type = createType()

function createType (): Type {
  return Object.keys(MiniCacheType).reduce((preV, key): any => {
    const type = MiniCacheType[key]

    switch (type) {
      case MiniCacheType.map:
        preV[key] = (v) => ({ type, mapType: v })
        break
      default:
        preV[key] = type
        break
    }

    return preV
  }, {})
}
