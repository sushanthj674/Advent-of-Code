import { intCode } from "./input.js";
class Interpreter {
  constructor(rawCode) {
    this.instructions = [...rawCode];
  }

  getInstruction(from) {
    const [opcode, opt1Address, opt2Address, resultAddress] = [
      this.instructions[from],
      this.instructions[from + 1],
      this.instructions[from + 2],
      this.instructions[from + 3],
    ];

    return [
      opcode,
      this.instructions[opt1Address],
      this.instructions[opt2Address],
      resultAddress,
    ];
  }

  upadatevalueAt(address, value) {
    this.instructions[address] = value;
  }

  getOutput() {
    const [output] = this.instructions;
    return output;
  }
}

const operations = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
};

const core = (intCode) => {
  let cursorPos = 0;
  let isHalt = false;
  const interpreter = new Interpreter(intCode);
  while (!isHalt) {
    const [opcode, opt1, opt2, resultAddress] = interpreter.getInstruction(
      cursorPos,
    );

    if (opcode !== 99) {
      const result = operations[opcode](opt1, opt2);
      interpreter.upadatevalueAt(resultAddress, result);
      cursorPos += 4;
    } else {
      isHalt = true;
    }
  }

  return interpreter.getOutput();
};

const deCode = (result) => {
  let noun = 0;
  let verb = 0;
  while (noun < 100) {
    intCode[1] = noun;
    intCode[2] = verb;

    const actualResult = core(intCode);

    if (result === actualResult) {
      return { noun: noun, verb: verb };
    }

    verb++;
    if (verb > 99) {
      noun++;
      verb = 0;
    }
  }
};

console.log(deCode(19690720));
