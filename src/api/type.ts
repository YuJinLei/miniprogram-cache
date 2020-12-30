import { MiniCacheType } from '../constants'

type CommonValue = string | boolean | number | any[] | object | undefined

type CommonType = {
  get: () => CommonValue
  set: (value: CommonValue) => void
  clear: () => void
}

type MapValue = string | boolean | number

type MapType = {
  get: (key: string) => MapValue
  set: (key: string, value: MapValue) => void
  clear: () => void
}

type Type = {
  string: CommonType
  boolean: CommonType
  number: CommonType,
  object: CommonType,
  array: CommonType,
  map: MapType
}

export const miniType: Type = createType()

function createType (): Type {
  return Object.keys(MiniCacheType).reduce((preV, key): any => {
    if (MiniCacheType[key] === MiniCacheType.none) {
      return preV
    }
    preV[key] = MiniCacheType[key]
    return preV
  }, {})
}
