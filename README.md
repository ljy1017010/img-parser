English | [简体中文](./docs/README.zh.md)

# img-parser

A JavaScript library that parses the true mime type, size, width and height of an image

## Supported image types

- png
- jpeg
- webp
- gif

## Installation

```
npm i img-parser
```

## Examples

Node.js

```
import { parseImg, getMime } from 'img-parser'

const fs = require('fs/promises')
const path = require('path')

const imgUrl = path.join(__dirname, './image/test.png')
const buff = await fs.readFile(imgUrl, { encoding: '' }) // Buffer

const result = parseImg(buff)
console.log(result)
// => {mime: "image/png", size: 6219, width: 140, height: 32}

const type = getMime(buff) // => 'image'

```

Browser

```
import { parseImg, getMime } from 'img-parser'

function handleChange(e) {
  const files = e.target.files

  // 如果取消选择，则不执行
  if (files.length === 0) return

  const file = files[0]
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)

  reader.onload = function (e) {
    const buf = e.target.result // ArrayBuffer
    const typeArr = new Uint8Array(buf)

    const result = parseImg(typeArr)

    console.log(result)
    // => {mime: "image/png", size: 6219, width: 140, height: 32}
  }
}
```
