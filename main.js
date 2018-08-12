/* TODO build out Guesser
 * - compile known word list
 * - check dictionary for words matching known letters and length
 * - three types of guesses
 *  1. yes dictionary words -> guess the most common letter
 *     - get rid of words as guesses fail
 *  2. no dictionary words, yes language -> guess the language's most common letters
 *  3. no dictionary words, no language -> guess letters and build up frequencies from responses
 *     - try this way first
 */

const storeAnswer = correctAnswer => (guessedAnswer => (guessedAnswer == correctAnswer));

const linearHandleCheckAnswer = correctAnswer => {
  normalizedAnswer = correctAnswer.toLowerCase();
  return function(letter, i) {
    return (normalizedAnswer[i] == letter);
  }
};

const guess = (letter, checkHandler, i) => {
  return (!badGuesses.includes(letter) && checkHandler(letter, i));
};

const handleCheckAnswer = answer => (letter => {
  return answer.split('').map((l, i) => {
    if (letter === l) {
      return i;
    }
  });
});

// guess a letter regardless of index
const guessManager = (knownSlots, guessHandler) => {
  const possibleGuesses = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .filter(guess => !knownSlots.includes(guess))
  ;
  const fillAnswer = (letterId, letter) => {
      knownSlots[letterId] = letter;
  };
  // guess unknown letter
  possibleGuesses.map(letter => {
    guessHandler(letter).map(letterId => {
      letterId > -1 && fillAnswer(letterId, letter);
    })
  });
  return knownSlots;
};

const formatGuess = guessLetters => (
  guessLetters
    .map(letter => (letter ? letter : '?'))
    .join('')
);

class PuzzleMaker {
  constructor(lexicon) {
    this.lexicon = lexicon;
    this.puzzles = [];
  }

  const setLexicon = lexicon => {
    this.lexicon = lexicon;
  };

  const getPuzzle = puzzleId => (this.puzzles.length-1 <= puzzleId ? this.puzzles[puzzleId] : null);

  const emptySlots = word => {
    const wordSlots = [];
    const slots = word.map(letter => Math.round(Math.random()) > 0 ? letter : '');
    return slots;
  };

  const addPuzzle = newPuzzle => {
    this.puzzles = [...this.puzzles, newPuzzle];
    const puzzleId = this.puzzles.length - 1;
    return puzzleId;
  };

  const createPuzzle = () => {
    const word = this.lexicon[Math.floor(Math.random() * this.lexicon.length)];
    const newPuzzle = {
      answer: word,
      slots: this.emptySlots(word)
    };
    return this.addPuzzle(newPuzzle);
  };

}

// TODO fetch full dictionary from API
// TODO have known answer display this managed by puzzle instead of guesser

const testLexicon = ['apple', 'banana', 'ghost', 'quaint', 'miscellany', 'precocious', 'splash', 'zebra'];
const puzzler = new PuzzleMaker(testLexicon);
const puzzle = puzzler.getPuzzle(puzzler.createPuzzle());

const checker = handleCheckAnswer(puzzle.answer);
const myGuess = guessManager(puzzle.slots, checker);

// finished filling out the answer
if (!myGuess.includes('')) {
  console.log('Successfully guessed the word or phrase!');
  console.log(`The answer is:  ${formatGuess(myGuess)}`);
} else {
  console.log('Guess was unsuccessful.');
  console.log(`I only got as far as:  ${formatGuess(myGuess)}`);
}
