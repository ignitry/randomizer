import { Changwat } from './changwat';

export class ThaiId {
  static generate(): string {
    const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    const firstDigit = 1;

    const changwatKeys: string[] = Changwat.List();

    const secondThirdDigits: number[] = changwatKeys[random(0, changwatKeys.length - 1)]
      .split('')
      .map(Number);

    let fourthFifthDigits: number[];
    if (secondThirdDigits.join('') === '10') {
      fourthFifthDigits = random(1, 50).toString().padStart(2, '0').split('').map(Number);
    } else {
      const fourthFifth = random(1, 100);
      if (fourthFifth <= 8 || fourthFifth === 99) {
        fourthFifthDigits = fourthFifth.toString().padStart(2, '0').split('').map(Number);
      } else {
        fourthFifthDigits = random(1, 8).toString().padStart(2, '0').split('').map(Number);
      }
    }

    const remainingDigits: number[] = Array.from({ length: 7 }, () => random(0, 9));

    const numbers: number[] = [firstDigit, ...secondThirdDigits, ...fourthFifthDigits, ...remainingDigits];

    const sum: number = numbers
      .map((num, index) => num * (13 - index))
      .reduce((acc, val) => acc + val, 0);

    const checksum: number = (11 - (sum % 11)) % 10;

    numbers.push(checksum);

    return numbers.join('');
  }
}
