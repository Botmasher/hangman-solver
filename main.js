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

// TODO create puzzle generator
// - have known answer display this managed by puzzle instead of guesser
const puzzle = {
  answer: 'splash',
  slots: ['', '', '', 'a', '', '']
};

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
