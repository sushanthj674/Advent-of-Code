import { data } from "./input.js";


const fuelRequiredFor = (mass) => {
  const requiredfuel = Math.floor(mass / 3) - 2;

  if (requiredfuel <= 0) return 0;
  return requiredfuel + fuelRequiredFor(requiredfuel);
};

const add = (a, b) => a + b;

const fuelRequiredForModules = data.map(fuelRequiredFor).reduce(add);

console.log(fuelRequiredForModules);