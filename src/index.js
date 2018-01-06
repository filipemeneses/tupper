const bigInt = require('big-integer')

const generateArray = (width, height) => {
  return Array.prototype.concat.apply([], Array(height)).map(() => {
    return Array.prototype.concat.apply([], Array(width)).map(n => 0)
  })
}

const tupper = {
  toGraph (number) {
    if (number.length < 1) throw new Error('No number to convert')

    let binary = bigInt(number).divide(17).toString(2)
    let pixels = generateArray(106, 17)

    if (binary.length < 1802) binary = '0'.repeat(1802 - binary.length) + binary

    for (let width = 105; width >= 0; width--) {
      for (let height = 0; height < 17; height++) {
        pixels[height][width] = parseInt(binary[(105 - width) * 17 + height])
      }
    }

    return pixels
  },
  toNumber (pixels) {
    let binary = ''

    for (let j = 105; j >= 0; --j) {
      for (let i = 0; i < 17; ++i) {
        binary += String(pixels[i][j])
      }
    }

    return bigInt(binary, 2).multiply(17).toString()
  }
}

export default tupper
