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

const winCondition = (a, b) => (a === 1 && b === 3) || (a === 2 && b === 1) || (a === 3 && b === 2);

const winningMatchup = [
  [3, 1],
  [1, 2],
  [2, 3],
];

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

  if (winCondition(response, request)) {
    return 6;
  } else if (request === response) {
    return 3;
  } else {
    return 0;
  }
}

/**
 * Calculates the roundscore based on the strategy guide
 * @param {[string, string]} round
 * @returns {number} roundScore
 */
function calculateStrategyScore(round) {
  const request = getShapeScore(round[0]);
  const responseStrategy = round[1];

  switch (responseStrategy) {
    // Win
    case "Z":
      return winningMatchup.find((matchUp) => matchUp[0] === request)[1] + 6;
    // Draw
    case "Y":
      return request + 3;
    // Lose
    case "X":
      return winningMatchup.find((matchUp) => matchUp[1] === request)[0];
    default:
      throw new Error("unknown response strategy");
  }
}

const games = inputData.split("\n");
const rounds = games.map((game) => game.split(" "));

const totalRoundScoresPart1 = rounds.map((round) => getOutcomeScore(round) + getShapeScore(round[1]));
const totalScorePart1 = totalRoundScoresPart1.reduce((a, b) => a + b, 0);

const totalRoundScoresPart2 = rounds.map((round) => calculateStrategyScore(round));
const totalScorePart2 = totalRoundScoresPart2.reduce((a, b) => a + b, 0);

console.log(`Part 1: If everything goes according to my strategy guide, my total score would be ${totalScorePart1}.`);
console.log(`Part 2: If everything goes according to my strategy guide, my total score would be ${totalScorePart2}.`);
