export const set = (key: string, data: any) => {
  // @ts-ignore
  wx.setStorage({ key, data })
}

export const get = (key: string) => {
  // @ts-ignore
  return wx.getStorageSync(key)
}

export const remove = (key: string) => {
  // @ts-ignore
  wx.removeStorage({ key })
}
