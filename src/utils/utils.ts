export const defineProperty = Object.defineProperty

export function addHiddenProp (object: any, propName: PropertyKey, value: any) {
  defineProperty(object, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value
  })
}

export function createDecorator (target: any, property: PropertyKey, valueKey: string, value: any) {
  const map: any = target[property] || {}

  map[valueKey] = value

  target[property] = map
}
