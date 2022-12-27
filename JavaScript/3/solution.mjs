import fs from "fs";

// Task Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
// Task Part 2: Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

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
 * Finds a matching character/item in two or three given strings
 * @param {[string]} items
 * @returns {string} string
 */
function findMatchingItem(items) {
  if (items.length > 2) {
    return [...items[0]].find((item) => items[1].match(new RegExp(item, "g")) && items[2].match(new RegExp(item, "g")));
  } else if (items.length === 2) {
    return [...items[0]].find((item) => items[1].match(new RegExp(item, "g")));
  } else {
    throw new Error("No matching Item found");
  }
}

/**
 * Groups an array of items by input array size.
 * @param {[string]} items
 * @param {number} size
 * @returns {[[string]]} [[string]]
 */
function groupItems(items, size) {
  let groupedItems = [];

  for (let i = 0; i < items.length; i += size) {
    groupedItems.push(items.slice(i, i + size));
  }
  return groupedItems;
}

const priorityMap = generatePriorityMap();

const itemsPerRucksack = inputData.split("\n");

// Part 1
const sortedItemsPerRucksack = itemsPerRucksack.map((items) => halveItems(items));
const matchingItemPerRucksack = sortedItemsPerRucksack.map((items) => findMatchingItem(items));
const sumOfAllMatchingItems = matchingItemPerRucksack.map((item) => priorityMap.get(item)).reduce((a, b) => a + b, 0);

// Part 2
const groupedItems = groupItems(itemsPerRucksack, 3);
const matchingItemPerGroup = groupedItems.map((items) => findMatchingItem(items));
const sumOfAllMatchingItemsPerGroup = matchingItemPerGroup
  .map((item) => priorityMap.get(item))
  .reduce((a, b) => a + b, 0);

console.log(`Part 1: The sum of priorities for the matching items is ${sumOfAllMatchingItems}.`);
console.log(
  `Part 2: The sum of priorities for matching items in a three-elf-group is ${sumOfAllMatchingItemsPerGroup}.`
);
