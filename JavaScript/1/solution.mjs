import fs from "fs";

// Task: Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

const inputData = fs.readFileSync(new URL("./input.md", import.meta.url), "utf8", (data) => {
  return data;
});

/**
 * Get the total sum of an array of numbers.
 * @param {number[] | string[]} numbers Array of numbers
 * @returns {number}
 */
function getTotalSum(numbers) {
  return numbers.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
}

/**
 * Finds the highest/greatest number in an array of numbers.
 * @param {number[]} numbers
 * @returns {number}
 */
function getGreatestNumber(numbers) {
  return Math.max.apply(Math, numbers);
}

/**
 * Sorts an array of numbers by descending order.
 * @param {number[]} numbers
 * @returns {number[]}
 */
function sortDescending(numbers) {
  return numbers.sort((a, b) => b - a);
}

const elves = inputData.split("\n\n");
const elvesTotalCalories = elves.map((elf) => getTotalSum(elf.split("\n")));
const topThreeElvesTotalCalories = sortDescending(elvesTotalCalories).slice(0, 3);

console.log(
  `Part 1: The Elf carrying the most calories is carrying ${getGreatestNumber(elvesTotalCalories)} calories.`
);

console.log(`Part 2: The top three Elves carry a total of ${getTotalSum(topThreeElvesTotalCalories)} calories.`);
