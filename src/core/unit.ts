import * as storage from '../core/storage'

interface UnitConstructorOption {
  key: string
  storable: boolean
  expires: number
}

interface StorageInfo {
  value: any
  expires: number
  updatedTs: number
}

export class Unit {
  private value
  private key!: string
  private storable!: boolean
  private expires!: number
  private updatedTs!: number

  constructor (option: UnitConstructorOption) {
    if (!option) throw new Error('the parameters<option> must be specified.')
    if (option.storable === undefined) option.storable = false
    if (!option.expires) option.expires = 1 * 60 * 1000

    this.init(option)
  }

  public get Expired (): boolean {
    const { updatedTs, expires } = this

    if (!updatedTs) return false

    return Date.now() - updatedTs > expires
  }

  private init (option: UnitConstructorOption) {
    const { storable, expires, key } = option

    this.storable = storable
    this.expires = expires
    this.key = key
  }

  private getStorageInfo (): StorageInfo {
    return storage.get(this.key)
  }

  private getStorageValue () {
    const storageInfo = this.getStorageInfo()

    if (!storageInfo) {
      return
    }

    const storageValue = storageInfo.value

    if ([null, undefined, NaN].indexOf(storageValue) === -1) {
      return
    }

    return storageValue
  }

  private createStorageInfo () {
    const { updatedTs, expires, value } = this

    return { updatedTs, expires, value }
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

    if (typeof value === 'boolean' && [true, false].includes(value)) return value

    if (value) return value
    if (!storable) return

    return this.getStorageValue()
  }

  public clear () {
    this.value = null
    this.updatedTs = 0

    storage.remove(this.key)
  }
}
