import { isNode, isNodeList, isFn, isString } from "log-tips"
import { throttle, debounce } from "./util"

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
    throw new Error("Missing required arguments")
  }

  if (!isString(type)) {
    throw new TypeError("Second argument must be a String")
  }

  if (!isFn(callback)) {
    throw new TypeError("Third argument must be a Function")
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

    throw new Error("Can not find a dom named" + target)
  } else {
    throw new TypeError(
      "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
    )
  }
}
/**
 * 处理dom节点
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */

function listenNode(node, type, callback) {
  node.addEventListener(type, callback)
  return {
    destroy: function() {
      node.removeEventListener(type, callback)
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

function listenNodeList(nodeList, type, callback) {
  Array.prototype.forEach.call(nodeList, function(node) {
    node.addEventListener(type, callback)
  })
  return {
    destroy: function() {
      Array.prototype.forEach.call(nodeList, function(node) {
        node.removeEventListener(type, callback)
      })
    }
  }
}

export { listen as default, throttle, debounce }
