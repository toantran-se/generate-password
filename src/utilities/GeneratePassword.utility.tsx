export const GeneratePassword = (
    passwordLength: number,
    isUseNumbers: boolean,
    isUseSymbols: boolean,
    isUseUpperCase: boolean,
) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()'

    const usableChars = chars
        + (isUseUpperCase ? chars.toUpperCase() : '')
        + (isUseNumbers ? numbers : '')
        + (isUseSymbols ? symbols : '')

    let generatedPassword = ''

    for (let i = 0; i <= passwordLength; i++) {
        generatedPassword += usableChars[Math.floor(Math.random() * (usableChars.length))]
    }

    return generatedPassword
}