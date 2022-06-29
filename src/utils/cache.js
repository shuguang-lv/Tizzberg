export class LRUCache {
  capacity // 容量
  cache // 缓存
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }
  get(key) {
    if (this.cache.has(key)) {
      let temp = this.cache.get(key)
      //访问到的 key 若在缓存中，将其提前
      this.cache.delete(key)
      this.cache.set(key, temp)
      return temp
    }
    return -1
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
      //存在则删除，if 结束再提前
    } else if (this.cache.size >= this.capacity) {
      // 超过缓存长度,淘汰最近没使用的
      this.cache.delete(this.cache.keys().next().value)
      console.log(`refresh: key:${key} , value:${value}`)
    }
    this.cache.set(key, value)
  }
  toString() {
    console.log('capacity', this.capacity)
    console.table(this.cache)
  }
}
