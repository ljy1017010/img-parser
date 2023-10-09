English | [简体中文](./docs/README.zh.md)

# img-parser

JavaScript library for Parsing image, by reading the image as binary data, according to the specifications of various kinds of images, get the image mime type, size and height width information.

Available in Node.js and in the browser

## Supported file types

- png
- jpeg
- webp
- gif

## Install

```
npm i img-parser
```

## Example

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

return an object(includes mime, size, width and height infomation)

### getMime(input)

return a string（for example：'image/png')
