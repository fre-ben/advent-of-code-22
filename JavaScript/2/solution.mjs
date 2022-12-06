import fs from "fs";

// Task Part 1: What would your total score be if everything goes exactly according to your strategy guide ?

const inputData = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8", (data) => {
  return data;
});

// Notes:
// A & X = ROCK -> 1 Point
// B & Y = PAPER -> 2 Points
// C & Z = SCISSORS -> 3 Points
// A & X > C & Z
// B & Y > A & X
// C & Z > B & Y
// Win: 6 Points
// Lose: 0 Points
// Draw: 3 Points

// Array aus Match-Strings machen und per reducer auf Punkte runterbrechen, danach Punkte Array summieren.

console.log(inputData.split("\n"));
