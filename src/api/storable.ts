import { createDecorator } from '../utils/utils'

export const storable = (target: any, property: string) => {
  createDecorator(target, property, 'storable', true)
}
