import * as storage from '../core/storage'
import { MiniCacheType } from '../constants'

declare type UnitConstructorOption = {
  key: string
  storable: boolean
  expires: number
  type: MiniCacheType
}

declare type StorageInfo = {
  value: any
  expires: number
  type: MiniCacheType
  updatedTs: number
}
export class Unit {
  private value
  private key: string
  private storable: boolean
  private expires: number
  private updatedTs: number
  private type: MiniCacheType

  constructor (option: UnitConstructorOption) {
    if (!option) throw new Error('the parameters<option> must be specified.')
    if (option.storable === undefined) option.storable = false
    if (!option.expires) option.expires = 1 * 60 * 1000
    if (!option.type) option.type = MiniCacheType.string

    this.init(option)
  }

  public get Expired (): boolean {
    const { updatedTs, expires } = this

    if (!updatedTs) return false

    return Date.now() - updatedTs > expires
  }

  private init (option: UnitConstructorOption) {
    const { storable, expires, key, type } = option

    this.storable = storable
    this.expires = expires
    this.key = key
    this.type = type
  }

  private getStorageInfo (): StorageInfo {
    let storageInfo: StorageInfo

    try {
      const info: string = storage.get(this.key)

      if (!info) {
        return
      }

      storageInfo = JSON.parse(info)
    } catch (error) {
      storageInfo = null
    }

    return storageInfo
  }

  private getStorageValue () {
    const storageInfo = this.getStorageInfo()

    if (!storageInfo) {
      return
    }

    try {
      const storageValue = storageInfo.value

      if ([null, undefined, NaN].indexOf(storageValue) === -1) {
        return
      }

      switch (storageInfo.type) {
        case MiniCacheType.string:
          return storageValue.toString()
        case MiniCacheType.number:
          return Number(storageValue)
        case MiniCacheType.boolean:
          return Boolean(storageValue)
        case MiniCacheType.array:
        case MiniCacheType.object:
          return JSON.parse(storageValue)
      }
    } catch (error) {
      return
    }
  }

  private createStorageInfo (): string {
    const { updatedTs, expires, value, type } = this
    const writeData = JSON.stringify({ updatedTs, expires, value, type })

    return writeData
  }

  public restoreStorage () {
    const storageInfo = this.getStorageInfo()

    if (!storageInfo) {
      return
    }

    const { updatedTs, value } = storageInfo

    this.value = value
    this.updatedTs = updatedTs
  }

  public set (value) {
    const { storable, key } = this
    const ts = Date.now()

    this.value = value
    this.updatedTs = ts

    if (storable) {
      storage.set(key, this.createStorageInfo())
    }
  }

  public get () {
    const { storable, value } = this

    if (value) return value
    if (!storable) return

    return this.getStorageValue()
  }

  public clear () {
    this.value = null
    this.updatedTs = null

    storage.remove(this.key)
  }
}
