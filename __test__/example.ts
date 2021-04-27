import {
  type,
  storable,
  field,
  expires,
  UNIT,
  connect
} from '../src'

class Example {
  @field('name')
  @expires(1 * UNIT.SECOND)
  @storable
  name!: type.String

  @field('names')
  @expires(1 * UNIT.SECOND)
  @storable
  names!: type.Array<string>

  @field('id')
  @expires(1 * UNIT.SECOND)
  @storable
  id!: type.Number

  @field('ids')
  @expires(1 * UNIT.SECOND)
  @storable
  ids!: type.Array<number>

  @field('hasPhone')
  @expires(1 * UNIT.SECOND)
  @storable
  hasPhone!: type.Boolean

  @field('hasPhones')
  @expires(1 * UNIT.SECOND)
  @storable
  hasPhones!: type.Array<boolean>

  @field('info')
  @expires(1 * UNIT.SECOND)
  @storable
  info!: type.Object<string>

  @field('infos')
  @expires(1 * UNIT.SECOND)
  @storable
  infos!: type.Array<Record<string, string>>

  @field('mapString')
  @expires(1 * UNIT.SECOND)
  @storable
  mapString!: type.Map<string>

  @field('mapNumber')
  @expires(1 * UNIT.SECOND)
  @storable
  mapNumber!: type.Map<number>

  @field('mapBoolean')
  @expires(1 * UNIT.SECOND)
  @storable
  mapBoolean!: type.Map<boolean>

  @field('mapArray')
  @expires(1 * UNIT.SECOND)
  @storable
  mapArray!: type.Map<string[]>

  @field('mapObject')
  @expires(1 * UNIT.SECOND)
  @storable
  mapObject!: type.Map<Record<string, string>>
}

const example = new Example()

connect('example', example)

export default example
