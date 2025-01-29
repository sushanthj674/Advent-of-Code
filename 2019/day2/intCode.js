class interpretor {
  #instrutions;
  #curserposition
  constructor(rawData) {
    this.#instrutions = rawData;

  }
  #add(num1, num2) {
    return num1 + num2;
  }
  
  #mul(num1, num2) {
    return num1 * num2;
  }


}
const [file] = Deno.args;
const intCode = Deno.readTextFileSync(file).split(",");

const obj = new interpretor(intCode);

console.log(intCode);
