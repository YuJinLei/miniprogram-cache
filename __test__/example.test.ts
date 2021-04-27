import example from './example'

const timer = (ts) => {
  return new Promise(resolve =>  setTimeout(resolve, ts))
}

test('string', async () => {
  const target = example.name
  const value = 'example'
  const value1 = 'example1'
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('string[]', async () => {
  const target = example.names
  const value = ['example']
  const value1 = ['example1']
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('number', async () => {
  const target = example.id
  const value = 1
  const value1 = 2
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('number[]', async () => {
  const target = example.ids
  const value = [1]
  const value1 = [2]
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('boolean', async () => {
  const target = example.hasPhone
  const value = true
  const value1 = false
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('boolean[]', async () => {
  const target = example.hasPhones
  const value = [true]
  const value1 = [false]
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('object', async () => {
  const target = example.info
  const value = { name: '1' }
  const value1 = { name: '2' }
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('object[]', async () => {
  const target = example.infos
  const value = [{ name: '1' }]
  const value1 = [{ name: '2' }]
  
  expect(target.get()).toBe(undefined)
  expect(target.set(value)).toBe(undefined)
  expect(target.get()).toBe(value)
  expect(target.set(value1)).toBe(undefined)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(value1)
  await timer(500)
  expect(target.get()).toBe(undefined)
  expect(target.clear()).toBe(undefined)
})

test('map string', async () => {
  const target = example.mapString
  const key = '1'
  const key2 = '2'
  const value = '1'
  const value2 = '2'
  
  expect(target.getMap(key)).toBe(undefined)
  expect(target.setMap(key, value)).toBe(undefined)
  expect(target.getMap(key)).toBe(value)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.setMap(key2, value2)).toBe(undefined)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.clearMap(key2)).toBe(undefined)
})

test('map boolean', async () => {
  const target = example.mapBoolean
  const key = '1'
  const key2 = '2'
  const value = true
  const value2 = false
  
  expect(target.getMap(key)).toBe(undefined)
  expect(target.setMap(key, value)).toBe(undefined)
  expect(target.getMap(key)).toBe(value)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.setMap(key2, value2)).toBe(undefined)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.clearMap(key2)).toBe(undefined)
})

test('map number', async () => {
  const target = example.mapNumber
  const key = '1'
  const key2 = '2'
  const value = 1
  const value2 = 2
  
  expect(target.getMap(key)).toBe(undefined)
  expect(target.setMap(key, value)).toBe(undefined)
  expect(target.getMap(key)).toBe(value)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.setMap(key2, value2)).toBe(undefined)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.clearMap(key2)).toBe(undefined)
})

test('map array', async () => {
  const target = example.mapArray
  const key = '1'
  const key2 = '2'
  const value = ['1']
  const value2 = ['2']
  
  expect(target.getMap(key)).toBe(undefined)
  expect(target.setMap(key, value)).toBe(undefined)
  expect(target.getMap(key)).toBe(value)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.setMap(key2, value2)).toBe(undefined)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.clearMap(key2)).toBe(undefined)
})

test('map object', async () => {
  const target = example.mapObject
  const key = '1'
  const key2 = '2'
  const value = { 1: '1' }
  const value2 = { 2: '2' }
  
  expect(target.getMap(key)).toBe(undefined)
  expect(target.setMap(key, value)).toBe(undefined)
  expect(target.getMap(key)).toBe(value)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.setMap(key2, value2)).toBe(undefined)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(value2)
  await timer(500)
  expect(target.getMap(key2)).toBe(undefined)
  expect(target.clearMap(key2)).toBe(undefined)
})
