export function useUpperFirstLetter(nameString) {
    const firstLetterUpper = nameString.charAt(0).toUpperCase()
    const restOfText = nameString.slice(1)
    const finalProductName = firstLetterUpper + restOfText
    return finalProductName
}