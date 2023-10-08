function parseImg(buff) {
  // 1
  if (['Uint8Array', 'Buffer'].includes(buff.constructor.name) === false) {
    return new Error('paragram must be a Buffer or Uint8Array')
  }

  const mime = getMime(buff)

  let result = {
    mime,
    size: buff.byteLength,
    width: 0,
    height: 0
  }

  if (mime === 'image/png') {
    result.width = buff[16] * 256 ** 3 + buff[17] * 256 ** 2 + buff[18] * 256 + buff[19]
    result.height = buff[20] * 256 ** 3 + buff[21] * 256 ** 2 + buff[22] * 256 + buff[23]
  } else if (mime === 'image/jpeg') {
    const SOF0 = [0xff, 0xc0]

    buff.forEach((v, i) => {
      if (v === SOF0[0] && buff[i + 1] === SOF0[1]) {
        let hBuff = new Uint8Array(buff.buffer, i + 5, 2) // Buffer.from([buff[i + 5], buff[i + 6]])
        let wBuff = new Uint8Array(buff.buffer, i + 7, 2) // Buffer.from([buff[i + 7], buff[i + 8]])

        result.width = wBuff[0] * 256 + wBuff[1] // wBuff.readUIntBE(0, 2)
        result.height = hBuff[0] * 256 + hBuff[1]
      }
    })
  } else if (mime === 'image/webp') {
    const VP8 = [0x56, 0x50, 0x38, 0x20]
    const VP8L = [0x56, 0x50, 0x38, 0x4c]

    buff.forEach((v, i) => {
      // 找到'VP8 'chunk (有损图片)
      if (VP8[3] === v && VP8[2] === buff[i - 1] && VP8[1] === buff[i - 2] && VP8[0] === buff[i - 3]) {
        const wBuff = new Uint8Array(buff.buffer, i + 11, 2) //  Buffer.from([buff[i + 11], buff[i + 12]])
        const hBuff = new Uint8Array(buff.buffer, i + 13, 2) // Buffer.from([buff[i + 13], buff[i + 14]])

        result.width = wBuff[1] * 256 + wBuff[0] // wBuff.readUIntLE(0, 2)
        result.height = hBuff[1] * 256 + hBuff[0]
      }

      // 找到'VP8L' chunk (无损图片)
      if (VP8L[3] === v && VP8L[2] === buff[i - 1] && VP8L[1] === buff[i - 2] && VP8L[0] === buff[i - 3]) {
        const whBuff = new Uint8Array(buff.buffer, i + 6, 4)
        const widthAndHeightBits = whBuff[3] * 256 ** 3 + whBuff[2] * 256 ** 2 + whBuff[1] * 256 + whBuff[0] //  whBuff.readUIntLE(0, 4)

        result.width = (widthAndHeightBits & 0x3fff) + 1
        result.height = (widthAndHeightBits >> 14) + 1
      }
    })
  } else if (mime === 'image/gif') {
    let whBuff = new Uint8Array(buff.buffer, 6, 4) //  buff.subarray(6, 10)

    result.width = whBuff[1] * 256 + whBuff[0] // whBuff.readUIntLE(0, 2)
    result.height = whBuff[3] * 256 + whBuff[2]
  }

  return result
}

function getMime(buff) {
  // 1
  if (['Uint8Array', 'Buffer'].includes(buff.constructor.name) === false) {
    return new Error('paragram must be a Buffer or Uint8Array')
  }

  // png
  const pngSign = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  if (
    pngSign[0] === buff[0] &&
    pngSign[1] === buff[1] &&
    pngSign[2] === buff[2] &&
    pngSign[3] === buff[3] &&
    pngSign[4] === buff[4] &&
    pngSign[5] === buff[5] &&
    pngSign[6] === buff[6] &&
    pngSign[7] === buff[7]
  ) {
    return 'image/png'
  }

  // jpeg
  const jpgSign = [0xff, 0xd8, 0xff]
  if (jpgSign[0] === buff[0] && jpgSign[1] === buff[1] && jpgSign[2] === buff[2]) {
    return 'image/jpeg'
  }

  // webp
  const RIFF = [82, 73, 70, 70]
  const WEBP = [87, 69, 66, 80]
  if (
    RIFF[0] === buff[0] &&
    RIFF[1] === buff[1] &&
    RIFF[2] === buff[2] &&
    RIFF[3] === buff[3] &&
    WEBP[0] === buff[8] &&
    WEBP[1] === buff[9] &&
    WEBP[2] === buff[10] &&
    WEBP[3] === buff[11]
  ) {
    return 'image/webp'
  }

  // gif
  const gifSign = [0x47, 0x49, 0x46]
  if (buff[0] === gifSign[0] && buff[1] === gifSign[1] && buff[2] === gifSign[2]) {
    return 'image/gif'
  }

  return 'image/unknown'
}

export default {
  parseImg,
  getMime
}
