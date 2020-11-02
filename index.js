const input = require('readline-sync');
let scoringAlgorithmSelection = null;

// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// Use the transform function to create the newPointStructure object here:
let newPointStructure = {};
transform(oldPointStructure);

// Create your scoringAlgorithms array here:

let scrabbleObject = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorefunction:scrabbleScore
};

let simpleScoreObject = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorefunction:simple
};

let bonusVowelsObject = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorefunction: bonus
};

let scoringAlgorithms = [scrabbleObject, simpleScoreObject,bonusVowelsObject];

// Code your transform function here:
function transform(oldPointStructure) {
  for (eachScore in oldPointStructure) {
    for (let i=0;i<oldPointStructure[eachScore].length;i++) {
      let newValue = oldPointStructure[eachScore][i];
      newPointStructure[newValue.toLowerCase()]= Number(eachScore);
    }
  }
}

// Scrabble Score function
function scrabbleScore (word, newPointStructure) {
    let wordArray = word.toLowerCase().split('');
    let score = 0;
    for (let i=0;i<wordArray.length;i++) {
      let letter = wordArray[i];
      score = score + newPointStructure[letter];
    }
    return score;
  }

// Simple Scoring function
function simple(word) {
  return word.length*1;
}

// Bonus Vowels function
function bonus(word) {
  let wordArray = word.toLowerCase().split('');
  let score = 0;
  for (let i=0;i<wordArray.length;i++) {
    let letter = wordArray[i];
    if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
      score = score + 3;
    } else {
      score = score + 1;
    }
  }
  return score;
}

// Code your initialPrompt function here:
function initialPrompt() {
  console.log(`Welcome to the Scrabble score calculator!
  \n
  Which scoring algorithm would you like to use?
  \n
  0 - Scrabble: The traditional scoring algorithm.
  \n
  1 - Simple Score: Each letter is worth 1 point.
  \n
  2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.
  \n`);

  scoringAlgorithmSelection = input.question("Enter 0, 1, or 2: ");

  console.log(`\n\nUsing algorithm: ${scoringAlgorithms[scoringAlgorithmSelection].name}`);

  let wordInput = "";

  while (wordInput.toLowerCase() !== "stop" ) {
    wordInput = input.question("\n\nEnter a word to be scored, or 'Stop' to quit: ");
    console.log(`Score for '${wordInput}': ${scoringAlgorithms[scoringAlgorithmSelection].scorefunction(wordInput,newPointStructure)}`);
  }
}

// Code your runProgram function here:

function runProgram(scoringAlgorithms) {
  initialPrompt();
}



// Call the runProgram function here:
runProgram();