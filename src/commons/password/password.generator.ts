export class PasswordGenerator {
  static generate() {
    const length = 8
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialCharacters = '!@#$%^&*'

    let result = ''

    const characters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters
    let passwordLowercase = false
    let passwordUppercase = false
    let passwordNumber = false
    let passwordSpecialCharacter = false

    while (result.length < length) {
      const index = Math.floor(Math.random() * characters.length)
      const character = characters.charAt(index)

      if (lowerCaseLetters.includes(character)) passwordLowercase = true
      if (upperCaseLetters.includes(character)) passwordUppercase = true
      if (numbers.includes(character)) passwordNumber = true
      if (specialCharacters.includes(character)) passwordSpecialCharacter = true

      result += character
    }

    if (!passwordLowercase) result += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length))
    if (!passwordUppercase) result += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length))
    if (!passwordNumber) result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    if (!passwordSpecialCharacter)
      result += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length))

    return result
  }
}
