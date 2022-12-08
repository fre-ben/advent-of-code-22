import fs from "fs";

// Task Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

const inputData = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8", (data) => {
  return data;
});

// Array aus items pro Rucksack erstellen
// Items in der Mitte aufteilen
// Feststellen welche items in Hälfte 1 und 2 gleich sind
// Priority der Items festellen
// Priority Summe der gleichen Items errechnen
// Priority Summe aller Items errechnen

console.log(inputData);
