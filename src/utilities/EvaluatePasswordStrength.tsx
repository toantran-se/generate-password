export const EvaluatePasswordStrength = (
  passwordLength: number,
  isUseNumbers: boolean,
  isUseSymbols: boolean,
  isUseUpperCase: boolean
) => {
  let strengthScore = 1;
  strengthScore += passwordLength >= 8 ? 1 : 0;
  strengthScore += isUseNumbers ? 1 : 0;
  strengthScore += isUseSymbols ? 1 : 0;
  strengthScore += isUseUpperCase ? 1 : 0;

  return strengthScore;
};
