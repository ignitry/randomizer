import changwats from './data/changwats.json';

export class Changwat {
  static #list: string[];

  public static List(): string[] {
    if (!this.#list) {
      this.#list = Object.keys(changwats);
    }

    return this.#list;
  }
}
