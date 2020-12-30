import { createDecorator } from '../utils/utils'

export const field = (key: string) => {
  return (target: any, property: string) => {
    createDecorator(target, property, 'key', key)
    createDecorator(target, property, 'isField', true)
  }
}
