interface MapType<T> {
  getMap: (key: string) => T | undefined
  setMap: (key: string, value: T) => void
  clearMap: (key: string) => void
}

interface CommonType<T> {
  get: () => T | undefined
  set: (value: T) => void
  clear: () => void
}

export type Array<T> = CommonType<T[]>
export type Object<T> = CommonType<Record<string, T>>
export type Boolean = CommonType<boolean>
export type String = CommonType<string>
export type Number = CommonType<number>
export type Map<T> = MapType<T>
