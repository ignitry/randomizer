export const RandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const ToZeroPaddedDigits = (num: number): number[] => {
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(Number)
};

export const DisplayThaiID = (thaiid :string): string => {
  return `${thaiid.slice(0, 1)}-${thaiid.slice(1, 5)}-${thaiid.slice(5, 10)}-${thaiid.slice(10, 12)}-${thaiid.slice(12)}`
};
