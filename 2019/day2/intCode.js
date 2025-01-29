class Interpreter {
  #instructions;
  #cursorPos;

  constructor(rawData) {
    this.#instructions = [...rawData];
    this.#cursorPos = 0;
  }

  #add(num1, num2) {
    return num1 + num2;
  }

  #mul(num1, num2) {
    return num1 * num2;
  }

  #core() {
    while (this.#cursorPos < this.#instructions.length) {
      const opcode = this.#instructions[this.#cursorPos];

      if (opcode === 99) break;

      const param1Pos = this.#instructions[++this.#cursorPos];
      const param2Pos = this.#instructions[++this.#cursorPos];
      const resultPos = this.#instructions[++this.#cursorPos];

      const param1 = this.#instructions[param1Pos];
      const param2 = this.#instructions[param2Pos];

      if (opcode === 1) {
        this.#instructions[resultPos] = this.#add(param1, param2);
      } else if (opcode === 2) {
        this.#instructions[resultPos] = this.#mul(param1, param2);
      } else {
        throw new Error(
          `Unknown opcode ${opcode} at position ${this.#cursorPos}`,
        );
      }

      ++this.#cursorPos;
    }
  }

  printOutput() {
    this.#core();
    return this.#instructions[0];
  }
}

const intCode = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  10,
  1,
  19,
  1,
  19,
  9,
  23,
  1,
  23,
  13,
  27,
  1,
  10,
  27,
  31,
  2,
  31,
  13,
  35,
  1,
  10,
  35,
  39,
  2,
  9,
  39,
  43,
  2,
  43,
  9,
  47,
  1,
  6,
  47,
  51,
  1,
  10,
  51,
  55,
  2,
  55,
  13,
  59,
  1,
  59,
  10,
  63,
  2,
  63,
  13,
  67,
  2,
  67,
  9,
  71,
  1,
  6,
  71,
  75,
  2,
  75,
  9,
  79,
  1,
  79,
  5,
  83,
  2,
  83,
  13,
  87,
  1,
  9,
  87,
  91,
  1,
  13,
  91,
  95,
  1,
  2,
  95,
  99,
  1,
  99,
  6,
  0,
  99,
  2,
  14,
  0,
  0,
];

const obj = new Interpreter(intCode);

console.log(obj.printOutput());
