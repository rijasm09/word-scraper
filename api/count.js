exports.count = string => {
    const words = string.split(" ").filter(word => word !== "")
    const totalWords = words.length

    return {totalWords }
  }