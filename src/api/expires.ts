import { createDecorator } from '../utils/utils'

export const expires = (t: number) => {
  return (target: any, property: string) => {
    createDecorator(target, property, 'expires', t)
  }
}
