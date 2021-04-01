export enum MiniCacheType {
  none = 0,
  string,
  number,
  boolean,
  array,
  map,
  object
}

const SECOND = 1000
const MIN = 60 * SECOND
const HOUR = 60 * MIN
const DAY = 24 * HOUR
const MONTH = 30 * DAY
const YEAR = 365 * DAY

/** 缓存时长类型 */
export const UNIT = {
  /** 秒 */
  SECOND,
  /** 分钟 */
  MIN,
  /** 小时 */
  HOUR,
  /** 日 */
  DAY,
  /** 月 */
  MONTH,
  /** 年 */
  YEAR
}
