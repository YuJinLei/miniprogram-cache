import { MiniCacheType } from '../constants'
import { addHiddenProp } from '../utils/utils'

import { Unit } from './unit'

declare type Property = {
  key: string
  expires: number
  storable: boolean
  isField: boolean
}

declare interface ConnectApi {
  get: (mapKey?: string) => void
  set: (mapKey?: string, value?) => void
  clear: (mapKey?: string) => void
}

export const connect = (modelName, context) => {
  if (!modelName) throw new Error('the parameters<modelName> must be specified.')
  if (!context) context = this

  const prototype = Reflect.getPrototypeOf(context)
  const propertyNames = Object.getOwnPropertyNames(prototype)

  for (let i = 0, len = propertyNames.length; i < len; i++) {
    const propertyName = propertyNames[i]
    const property: Property = prototype[propertyName]

    if (!property) continue
    if (!property.isField) continue

    const { key, expires, storable } = property
    const type = context[propertyName]
    let value: ConnectApi

    if (type === MiniCacheType.map) {
      const mapNodes: Map<string, Unit> = new Map()
      const getUnit = (mapKey: string) => {
        if (!mapNodes.has(mapKey)) {
          const unit = new Unit({ key: `${modelName}_${key}_${mapKey}`, expires, storable, type })
          mapNodes.set(mapKey, unit)
          unit.restoreStorage()
        }

        return mapNodes.get(mapKey)
      }

      value = {
        get (mapKey: string) {
          if (!mapKey) {
            return
          }

          const unit = getUnit(mapKey)

          if (unit.Expired) {
            return
          }

          return unit.get()
        },
        set (mapKey: string, mapValue) {
          if (!mapKey) {
            return
          }

          const unit = getUnit(mapKey)

          unit.set(mapValue)
        },
        clear (mapKey: string) {
          if (!mapKey) {
            return
          }

          const unit = getUnit(mapKey)

          unit.clear()
        }
      }
    } else {
      const unit = new Unit({ key: `${modelName}_${key}`, expires, storable, type })

      value = {
        get () {
          if (unit.Expired) {
            return
          }
          return unit.get()
        },
        set (v) {
          unit.set(v)
        },
        clear () {
          unit.clear()
        }
      }

      unit.restoreStorage()
    }

    addHiddenProp(context, propertyName, value)
  }
}
