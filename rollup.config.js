import babel from "rollup-plugin-babel"
import replace from "rollup-plugin-replace"
import { uglify } from "rollup-plugin-uglify"
import pkg from "./package.json"

const input = "src/listen.js"

export default [
  // ESM build(ES6)
  // {
  //   input,
  //   output: {
  //     file: pkg.module,
  //     format: "esm"
  //   },
  //   plugins: [babel()]
  // },
  // CommonJS build(node)
  // {
  //   input,
  //   output: {
  //     file: pkg.main,
  //     format: "cjs"
  //   },
  //   plugins: [babel()]
  // },
  // UMD: Production build(判断是否支持 AMD，判断是否支持 CommonJS，如果都没有 使用全局变量)
  {
    input,
    output: {
      file: "dist/tiny-listener.js",
      format: "umd",
      name: "warning"
    },
    plugins: [
      // Setting development env before running babel etc
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
      babel()
    ]
  },
  {
    input,
    output: {
      file: "dist/tiny-listener.min.js",
      format: "umd",
      name: "warning"
    },
    plugins: [
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      babel(),
      uglify()
    ]
  }
]
