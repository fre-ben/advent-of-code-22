import fs from "fs";

// Task Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

const inputData = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8", (data) => {
  return data;
});

/**
 * Generates the described PriorityMap.
 * @returns {Map<string, number>} Map<string, number>
 */
function generatePriorityMap() {
  const priorityMap = new Map();
  const lowerCaseAlphabet = [..."abcdefghijklmnopqrstuvwxyz"];
  lowerCaseAlphabet.forEach((char, index) => priorityMap.set(char, index + 1));
  lowerCaseAlphabet.forEach((char, index) => priorityMap.set(char.toUpperCase(), index + 27));
  return priorityMap;
}

/**
 * Halves a string/items into even substrings.
 * @param {string} items
 * @returns {[string, string]} [string, string]
 */
function halveItems(items) {
  const firstHalf = items.slice(0, Math.floor(items.length / 2));
  const secondHalf = items.slice(Math.floor(items.length / 2, items.length));
  return [firstHalf, secondHalf];
}

/**
 * Finds a matching character/item in two given strings
 * @param {[string, string]} items
 * @returns {string} string
 */
function findMatchingItem(items) {
  const matchingItem = [...items[0]].find((item) => items[1].match(new RegExp(item, "g")));

  if (!matchingItem) {
    throw new Error("No matching Item found");
  } else {
    return matchingItem;
  }
}

const priorityMap = generatePriorityMap();

const itemsPerRucksack = inputData.split("\n");
const sortedItemsPerRucksack = itemsPerRucksack.map((items) => halveItems(items));
const matchingItemPerRucksack = sortedItemsPerRucksack.map((items) => findMatchingItem(items));
const sumOfAllMatchingItems = matchingItemPerRucksack.map((item) => priorityMap.get(item)).reduce((a, b) => a + b, 0);

console.log(`Part 1: The sum of priorities of the matching items is ${sumOfAllMatchingItems}.`);
