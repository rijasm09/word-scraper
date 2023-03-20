exports.clean = string => {
    const alphabet = string.replace(/[^A-Za-z']+/g, " ").trim()
    const lowerCase = alphabet.toLowerCase()
    return lowerCase
  }