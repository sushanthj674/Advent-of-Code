import input from "./input.json" with { type: "json" };

const { firstWire, secondWire } = input;

const generateWirePath = (wire) => {
  let x = 0, y = 0, steps = 0;
  const path = {};

  for (const { direction, steps: moveSteps } of wire) {
    for (let i = 0; i < moveSteps; i++) {
      steps++;
      if (direction === "U") y++;
      if (direction === "D") y--;
      if (direction === "L") x--;
      if (direction === "R") x++;

      const key = `${x},${y}`;
      if (!(key in path)) {
        path[key] = steps;
      }
    }
  }
  return path;
};

const findIntersections = (wire1Path, wire2) => {
  let x = 0, y = 0, steps = 0;
  const intersections = {};

  for (const { direction, steps: moveSteps } of wire2) {
    for (let i = 0; i < moveSteps; i++) {
      steps++;
      if (direction === "U") y++;
      if (direction === "D") y--;
      if (direction === "L") x--;
      if (direction === "R") x++;

      const key = `${x},${y}`;
      if (key in wire1Path) {
        intersections[key] = wire1Path[key] + steps;
      }
    }
  }
  return intersections;
};

const manHattanDistance = (coord) => {
  const [x, y] = coord.split(",").map(Number);
  return Math.abs(x) + Math.abs(y);
};

const part1 = (intersections) => {
  return Math.min(...Object.keys(intersections).map(manHattanDistance));
};

const part2 = (intersections) => {
  return Math.min(...Object.values(intersections));
};

const wire1Path = generateWirePath(firstWire);
const intersections = findIntersections(wire1Path, secondWire);
console.log(wire1Path)
console.time();
console.log("Part 1 (Closest Intersection Distance):", part1(intersections));
console.log("Part 2 (Fewest Steps to Intersection):", part2(intersections));
console.timeEnd();
