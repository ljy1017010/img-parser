简体中文 | [English](../README.md)

# img-parser

一个解析图片的 JavaScript 库，通过读取图片为二进制数据，依照图片规范进行解析，获取图片的 mime、大小和高宽信息。

可以在 Node.js 和浏览器中使用

## 支持的文件类型

- png
- jpeg
- webp
- gif

## 安装

```
npm i img-parser
```

## 示例

Node.js 中

```
import { parseImg, getMime } from 'img-parser'

import fs from 'fs/promises'
import path from 'path'

const imgUrl = path.join(__dirname, './image/test.png')
const buff = await fs.readFile(imgUrl, { encoding: '' })

const result = parseImg(buff)
// => {mime: "image/png", size: 6219, width: 140, height: 32}

const type = getMime(buff)
// => 'image/png'

```

浏览器中

```
import { parseImg, getMime } from 'img-parser'

function handleChange(e) {
  const files = e.target.files
  const file = files[0]

  const reader = new FileReader()
  reader.readAsArrayBuffer(file)

  reader.onload = function (e) {
    const buf = e.target.result
    const typeArr = new Uint8Array(buf)

    const result = parseImg(typeArr)
    // => {mime: "image/png", size: 6219, width: 140, height: 32}

    const type = getMime(buff)
    // => 'image/png'
  }
}
```
