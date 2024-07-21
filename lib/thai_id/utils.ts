export const RandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ToZeroPaddedDigits = (num: number): number[] => {
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(Number);
};
