import { isNode, isNodeList, isFn, isString } from 'log-tips'
import { throttle, debounce, addEvent, removeEvent } from './util'

/**
 * 对节点添加监听事件
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object} 返回监听事件销毁方法 destory()
 */

function listen(target, type, callback) {
  if (!target && !type && !callback) {
    throw new Error('Missing required arguments')
  }

  if (!isString(type)) {
    throw new TypeError('Second argument must be a String')
  }

  if (!isFn(callback)) {
    throw new TypeError('Third argument must be a Function')
  }

  if (isNode(target)) {
    return listenNode(target, type, callback)
  } else if (isNodeList(target)) {
    return listenNodeList(target, type, callback)
  } else if (isString(target)) {
    const dom = document.querySelector(target)

    if (dom) {
      return listenNode(dom, type, callback)
    }

    throw new Error('Can not find a dom named' + target)
  } else {
    throw new TypeError(
      'First argument must be a String, HTMLElement, HTMLCollection, or NodeList'
    )
  }
}
/**
 * 处理dom节点
 *
 * @param {HTMLElement} el
 * @param {String} event
 * @param {Function} handler
 * @return {Object}
 */

function listenNode(el, event, handler) {
  addEvent(el, event, handler)
  return {
    destroy: function() {
      removeEvent(el, event, handler)
    }
  }
}
/**
 * 处理nodeList
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */

function listenNodeList(nodeList, event, handler) {
  Array.prototype.forEach.call(nodeList, function(el) {
    addEvent(el, event, handler)
  })
  return {
    destroy: function() {
      Array.prototype.forEach.call(nodeList, function(el) {
        removeEvent(el, event, handler)
      })
    }
  }
}

export { listen as default, throttle, debounce }
