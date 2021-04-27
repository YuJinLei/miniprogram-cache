// Run Test TODO:
// const __global: Record<string, any> = {}
// let WX: WechatMiniprogram.Wx

// try {
//   WX = wx
// } catch (error) {
//   WX = {
//     setStorage (options: WechatMiniprogram.SetStorageOption) {
//       if (!options) {
//         return
//       }
  
//       const { key, data } = options
//       __global[key] = data
//     },
//     getStorageSync (key: string) {
//       if (!key) {
//         return
//       }
  
//       return __global[key]
//     },
//     removeStorage (options: WechatMiniprogram.RemoveStorageOption) {
//       if (!options) {
//         return
//       }
  
//       const {key } = options
  
//       if (!key) {
//         return
//       }
  
//       Reflect.deleteProperty(__global, key)
//     }
//   } as WechatMiniprogram.Wx
// }

// Run prod TODO:
const WX = wx

export const set = (key: string, data: any) => {
  WX.setStorage({ key, data })
}

export const get = (key: string) => {
  return WX.getStorageSync(key)
}

export const remove = (key: string) => {
  WX.removeStorage({ key })
}
