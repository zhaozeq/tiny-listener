/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const node = function(value) {
  return (
    value !== undefined && value instanceof HTMLElement && value.nodeType === 1
  )
}

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const nodeList = function(value) {
  var type = Object.prototype.toString.call(value)

  return (
    value !== undefined &&
    (type === "[object NodeList]" || type === "[object HTMLCollection]") &&
    "length" in value &&
    (value.length === 0 || exports.node(value[0]))
  )
}

/**
 * Check if argument is a SVG element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const svg = function(value) {
  return value !== undefined && value instanceof SVGElement
}

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const string = function(value) {
  return typeof value === "string" || value instanceof String
}

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const fn = function(value) {
  var type = Object.prototype.toString.call(value)

  return type === "[object Function]"
}
