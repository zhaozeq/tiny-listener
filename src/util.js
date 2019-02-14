/**
 * 限制每秒回调的数量的方式来达到优化目的
 *
 * @param {*} fn
 * @param {number} [threshhold=250]
 * @param {*} scope
 * @returns
 */
function throttle(fn, threshhold = 250, scope) {
  let last
  let deferTimer
  return () => {
    const context = scope || this
    const now = +new Date()
    const args = arguments
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * 防抖函数
 *
 * @param {*} fn
 * @param {*} wait
 * @param {*} scope
 * @returns
 */
function debounce(fn, wait, scope) {
  let last
  return function(event) {
    const ctx = scope || this
    clearTimeout(last)
    last = setTimeout(function() {
      fn.apply(ctx, [event, fn, wait, scope])
    }, wait)
  }
}
export { throttle, debounce }
