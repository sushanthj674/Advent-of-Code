const intCode = [
  1,
  12,
  2,
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
