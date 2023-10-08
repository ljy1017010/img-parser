# img-parser

A JavaScript library that parses the true mime type, size, width and height of an image (PNG, JPEG, WEBP, GIF)

## Installation

```
npm i img-parser
```

## Examples

```
import { parseImg, getMime } from 'img-parser'

const fs = require('fs/promises')
const path = require('path')

const imgUrl = path.join(__dirname, './image/test.png')
const buff = await fs.readFile(imgUrl, { encoding: '' }) // Buffer

const result = parseImg(buff)
console.log(result)

```
