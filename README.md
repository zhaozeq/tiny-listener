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
<script src="dist/tiny-listen.js"></script>
```

###### 新增 ++ (throttle, debounce)函数

```js
import listen, { throttle, debounce } from "tiny-listen"

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

| <img src="https://clipboardjs.com/assets/images/chrome.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://clipboardjs.com/assets/images/edge.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://clipboardjs.com/assets/images/firefox.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://clipboardjs.com/assets/images/ie.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://clipboardjs.com/assets/images/opera.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://clipboardjs.com/assets/images/safari.png" width="48px" height="48px" alt="Safari logo"> |
| :-------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
|                                                 Latest ✔                                                  |                                               Latest ✔                                                |                                                  Latest ✔                                                   |                                                       9+ ✔                                                       |                                                Latest ✔                                                 |                                                 Latest ✔                                                  |

## License
