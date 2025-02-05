const space = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

// const space = `.####.####
// .....##.#.`
const input = space.split("\n").map((line) => line.split(""));

const astroidsLocations = (space) => {
  const locations = [];
  for (let y = 0; y < space.length; y++) {
    for (let x = 0; x < space[y].length; x++) {
      if (space[y][x] === "#") {
        locations.push({
          x: x,
          y: y,
        });
      }
    }
  }
  return locations;
};

const toDegree = (rad) => rad * (180 / Math.PI);

const locations = astroidsLocations(input);

const radar = (locations) => {
  const allLocations = new Map();
  for (const base of locations) {
    const angles = {};

    allLocations.set(base, angles);

    for (const station of locations) {
      const angle = toDegree(
        Math.atan2(base.y - station.y, base.x - station.x),
      );

      if (!(angle in angles)) {
        angles[angle] = { stations: [] };
      }
      angles[angle].stations.push(station);
    }
  }
  return allLocations;
};

const part1 = (stations) => {
  return [...stations.values()].map((val) => Object.values(val).length).sort((
    a,
    b,
  ) => a - b).at(-1);
};

console.log(part1(radar(locations)));
