import { Changwat } from './thai_id/changwat';
import { RandomNumber, ToZeroPaddedDigits } from './thai_id/utils'

export class ThaiId {
  static generate(): string {
    const firstDigit = RandomNumber(1,3)

    const changwatKeys: string[] = Changwat.List()

    const secondThirdDigits: number[] = changwatKeys[RandomNumber(0, changwatKeys.length - 1)]
      .split('')
      .map(Number)

    let fourthFifthDigits: number[]
    if (secondThirdDigits.join('') === '10') {
      fourthFifthDigits = ToZeroPaddedDigits(RandomNumber(1, 50))
    } else {
      const fourthFifth = RandomNumber(1, 100)
      if (fourthFifth <= 8 || fourthFifth === 99) {
        fourthFifthDigits = ToZeroPaddedDigits(fourthFifth)
      } else {
        fourthFifthDigits = ToZeroPaddedDigits(RandomNumber(1, 8))
      }
    }

    const remainingDigits: number[] = Array.from({ length: 7 }, () => RandomNumber(0, 9))

    const numbers: number[] = [
      firstDigit,
      ...secondThirdDigits,
      ...fourthFifthDigits,
      ...remainingDigits,
    ]

    const checksum: number = this.calculateChecksum(numbers)

    numbers.push(checksum)

    return numbers.join('')
  }

  static validate(id: string): string[] {
    let errors = []

    if (id.length !== 13 || !/^\d{13}$/.test(id)) {
      errors.push("จำนวนหลักไม่เท่ากับ 13 หลัก")
      return errors
    }

    const digits: number[] = id.split('').map(Number)
    const checksum: number = this.calculateChecksum(digits.slice(0, 12))

    if (checksum !== digits[12]) {
      errors.push("เลขหลักสุดท้ายไม่ตรงตามแบบ")
    }

    return errors;
  }

  private static calculateChecksum(digits: number[]): number {
    const sum: number = digits
      .map((num, index) => num * (13 - index))
      .reduce((acc, val) => acc + val, 0)

    return (11 - (sum % 11)) % 10
  }
}
