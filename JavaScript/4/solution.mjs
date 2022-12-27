import fs from "fs";

// Task Part 1: In how many assignment pairs does one range fully contain the other?

const inputData = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8", (data) => {
  return data;
});

/**
 *
 * @param {number} start
 * @param {number} stop
 * @returns {string} string
 */
function generateRange(start, stop) {
  if (start === stop) {
    return [Number(start)];
  } else {
    return Array.from({ length: stop - start + 1 }, (x, i) => Number(i) + Number(start));
  }
}

function checkMatchingRange(a, b) {
  const sortedArrays = [a, b].sort();
  return sortedArrays[1].every((element) => sortedArrays[0].includes(element));
}

const pairs = inputData.split("\n").map((input) => input.split(","));
const splitPairs = pairs.map((pair) => [pair[0].split("-"), pair[1].split("-")]);
const rangifiedPairs = splitPairs.map((pair) => pair.map((section) => generateRange(section[0], section[1])));
const fullyContainedPairs = rangifiedPairs.map((pair) => checkMatchingRange(pair[0], pair[1]));
const numberOfFullyContainedPairs = fullyContainedPairs.reduce((a, b) => a + (b === true), 0);

console.log(numberOfFullyContainedPairs);
