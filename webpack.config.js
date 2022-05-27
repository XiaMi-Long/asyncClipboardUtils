/*
 * @Descripttion:
 * @version:
 * @Author: wwy
 * @Date: 2022-05-27 14:18:58
 * @LastEditors: wwy
 * @LastEditTime: 2022-05-27 14:22:21
 */
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.min.js",
    path: path.resolve(__dirname, "dist"),
  },
};
