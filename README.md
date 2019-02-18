# tiny-listener

> A more versatile way of adding & removing event listeners.

## Install

You can get it on npm.

```
npm install tiny-listen --save
```

## Setup

###### Node (Browserify)

```js
var listen = require("tiny-listen")
```

###### Browser (Standalone)

```html
<script src="dist/tiny-listen.js </script>
```

###### 新增 ++ (throttle, debounce)函数

```js
import listen, { throttle, debounce } from "tiny-listen"
/**
 * throttle, debounce 函数入参
 *
 * @param {function} func
 * @param {*} wait
 * @param {object} options
 *    - leading:Boolean 开始时调用
 *    - trailing:Boolean 结束时调用
 *    - maxWait:Number 最大等待时间
 * @returns
 */
const listener = listen(this.scroller, "mousewheel", throttle(this.scroll, 300))
```

## Usage

### Add an event listener

```js
listen(".btn", "click", function(e) {
  console.log(e)
})
```

Or by passing a HTML element

```js
var logo = document.getElementById("logo")

listen(logo, "click", function(e) {
  console.log(e)
})
```

Or by passing a list of HTML elements

```js
var anchors = document.querySelectorAll("a")

listen(anchors, "click", function(e) {
  console.log(e)
})
```

### Remove an event listener

By calling the `destroy` function that returned from previous operation.

```js
var listener = listen(".btn", "click", function(e) {
  console.log(e)
})

listener.destroy()
```

## Browser Support

| ![Chrome logo](https://www.sunjiaying.com/images/chrome_icon.png){:width="48px" height="48px"} | ![Edge logo](https://clipboardjs.com/assets/images/edge_icon.png){:width="48px" height="48px"} | ![Firefox logo](https://clipboardjs.com/assets/images/firefox.png){:width="48px" height="48px"} | ![Internet Explorer logo](https://clipboardjs.com/assets/images/ie.png){:width="48px" height="48px"} | ![Opera logo](https://clipboardjs.com/assets/images/opera.png){:width="48px" height="48px"} | ![Safari logo](https://clipboardjs.com/assets/images/safari.png){:width="48px" height="48px"} |
| :--------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|                                            Latest ✔                                            |                                            Latest ✔                                            |                                            Latest ✔                                             |                                                 9+ ✔                                                 |                                          Latest ✔                                           |                                           Latest ✔                                            |

## License
