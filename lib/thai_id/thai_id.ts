import { Changwat } from './changwat';
import { RandomNumber, ToZeroPaddedDigits } from './utils'

export class ThaiId {
  static generate(): string {
    const firstDigit = RandomNumber(1,3);

    const changwatKeys: string[] = Changwat.List();

    const secondThirdDigits: number[] = changwatKeys[RandomNumber(0, changwatKeys.length - 1)]
      .split('')
      .map(Number);

    let fourthFifthDigits: number[];
    if (secondThirdDigits.join('') === '10') {
      fourthFifthDigits = ToZeroPaddedDigits(RandomNumber(1, 50));
    } else {
      const fourthFifth = RandomNumber(1, 100);
      if (fourthFifth <= 8 || fourthFifth === 99) {
        fourthFifthDigits = ToZeroPaddedDigits(fourthFifth);
      } else {
        fourthFifthDigits = ToZeroPaddedDigits(RandomNumber(1, 8));
      }
    }

    const remainingDigits: number[] = Array.from({ length: 7 }, () => RandomNumber(0, 9));

    const numbers: number[] = [firstDigit, ...secondThirdDigits, ...fourthFifthDigits, ...remainingDigits];

    const sum: number = numbers
      .map((num, index) => num * (13 - index))
      .reduce((acc, val) => acc + val, 0);

    const checksum: number = (11 - (sum % 11)) % 10;

    numbers.push(checksum);

    return numbers.join('');
  }

  static validate(id: string): boolean {
    if (id.length !== 13 || !/^\d{13}$/.test(id)) {
      return false;
    }

    const digits: number[] = id.split('').map(Number);

    const sum: number = digits
      .slice(0, 12)
      .map((num, index) => num * (13 - index))
      .reduce((acc, val) => acc + val, 0);

    const checksum: number = (11 - (sum % 11)) % 10;

    return checksum === digits[12];
  }
}
