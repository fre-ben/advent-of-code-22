import fs from "fs";

// Task Part 1: What would your total score be if everything goes exactly according to your strategy guide?
// Task Part 2: Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

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

const inputData = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8", (data) => {
  return data;
});

/**
 * Gets the correct score based on the given shape.
 * @param {string} shape
 * @returns {number} number
 */
function getShapeScore(shape) {
  switch (shape) {
    case "A":
    case "X":
      return 1;
    case "B":
    case "Y":
      return 2;
    case "C":
    case "Z":
      return 3;
    default:
      throw new Error("invalid shape");
  }
}

/**
 * Calculates the outcome score of a given round.
 * @param {[string, string]} round
 * @returns {number} number
 */
function getOutcomeScore(round) {
  const request = getShapeScore(round[0]);
  const response = getShapeScore(round[1]);

  if ((response === 1 && request === 3) || (response === 2 && request === 1) || (response === 3 && request === 2)) {
    return 6;
  } else if (request === response) {
    return 3;
  } else {
    return 0;
  }
}

// Todo: FUnktion, die die rounds basierend auf das gewünschte Endergebnis transformiert und den response Wert entsprechend austauscht
// Danach vorhandene Funktionen abfeuern

const games = inputData.split("\n");
const rounds = games.map((game) => game.split(" "));

const totalRoundScores = rounds.map((round) => getOutcomeScore(round) + getShapeScore(round[1]));
const totalScore = totalRoundScores.reduce((a, b) => a + b, 0);

console.log(`Part 1: If everything goes according to my strategy guide, my total score would be ${totalScore}.`);
