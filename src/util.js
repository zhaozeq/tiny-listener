import { isObject, isFn } from "./is"

/**
 * 截流函数
 *
 * @param {function} fn
 * @param {number} [wait=250]
 * @param {object} options
 * @returns
 */
function throttle(func, wait = 250, options) {
  let leading = true
  let trailing = true

  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading
    trailing = "trailing" in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  })
}

/**
 * 防抖函数
 *
 * @param {function} func
 * @param {*} wait
 * @param {object} options
 *    - leading:Boolean 开始时调用
 *    - trailing:Boolean 结束时调用
 *    - maxWait:Number 最大等待时间
 * @returns
 */
function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime, // //上次调用debounced时间,即触发时间，不一定会调用func
    lastInvokeTime = 0, //上次调用func时间，即成功执行时间
    leading = false,
    maxing = false,
    trailing = true

  const isBrowser = typeof window == "object" && window !== null
  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait &&
    wait !== 0 &&
    isBrowser &&
    typeof window.requestAnimationFrame === "function"

  if (!isFn(func)) {
    throw new TypeError("Expected a function")
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = "maxWait" in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = "trailing" in options ? !!options.trailing : trailing
  }
  function invokeFunc(time) {
    // 执行func
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      window.cancelAnimationFrame(timerId)
      return window.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id) {
    if (useRAF) {
      return window.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time) {
    lastInvokeTime = time
    timerId = startTimer(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // 第一次调用 || 上一次已经停止 || 系统时间倒退 || 已经达到max限制
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      // 在 trailing edge 且时间符合条件时，调用 trailingEdge函数，否则重启定时器
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        // 首次触发
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export { throttle, debounce }
