import fs from "fs";

// Task Part 1: What would your total score be if everything goes exactly according to your strategy guide?

const inputData = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8", (data) => {
  return data;
});
