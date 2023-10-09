简体中文 | [English](../README.md)

# img-parser

解析图像的 JavaScript 库，通过读取图像为二进制数据，根据各种图像的规范，获取图像的 mime 类型、大小和高宽信息。

可在 Node.js 和浏览器中使用

## 支持的图片类型

- png
- jpeg
- webp
- gif

## 安装

```
npm i img-parser
```

## 示例

Node.js

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

Browser

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

## API

### parseImg(input)

#### input

Type: `Buffer | Uint8Array`

返回一个 object 对象(包括 mime, size, width and height 属性)

### getMime(input)

返回一个字符串（比如：'image/png')
