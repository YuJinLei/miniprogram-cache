import { addHiddenProp } from '../utils/utils'

import { Unit } from '../core/unit'

type Property = {
  key: string
  expires: number
  storable: boolean
  isField: boolean
}

export const connect = (modelName: string, context) => {
  if (!modelName) throw new Error('the parameters<modelName> must be specified.')
  if (!context) context = this

  const prototype = Reflect.getPrototypeOf(context)
  const propertyNames = Object.getOwnPropertyNames(prototype)

  for (let i = 0, len = propertyNames.length; i < len; i++) {
    const propertyName = propertyNames[i]
    const property: Property = prototype?.[propertyName]

    if (!property) continue
    if (!property.isField) continue

    const { key, expires, storable } = property
    const unit = new Unit({ key: `${modelName}_${key}`, expires, storable })
    const mapNodes: Map<string, Unit> = new Map()
    const getUnitMap = (mapKey: string) => {
      if (!mapNodes.has(mapKey)) {
        const unit = new Unit({ key: `${modelName}_${key}_${mapKey}`, expires, storable })
        mapNodes.set(mapKey, unit)
        unit.restoreStorage()
      }

      return mapNodes.get(mapKey)
    }

    unit.restoreStorage()

    // 配合ts语法提示，动态生成对象
    const proxy = new Proxy({}, {
      get (v, p) {
        switch (p) {
          case 'get':
            return function () {
              if (unit.Expired) {
                return
              }

              return unit.get()
            }
          case 'set':
            return function (v) {
              unit.set(v)
            }
          case 'clear':
            return function () {
              unit.clear()
            }
          case 'getMap':
            return function (mapKey: string) {
              if (!mapKey) {
                return
              }

              const unit = getUnitMap(mapKey)

              if (unit?.Expired) {
                return
              }

              return unit?.get()
            }
          case 'setMap':
            return function (mapKey: string, mapValue) {
              if (!mapKey) {
                return
              }

              const unit = getUnitMap(mapKey)

              unit?.set(mapValue)
            }
          case 'clearMap':
            return function (mapKey: string) {
              if (!mapKey) {
                return
              }

              const unit = getUnitMap(mapKey)

              unit?.clear()
            }
        }
      }
    }) 
    
    addHiddenProp(context, propertyName, proxy)
  }

  return context
}
