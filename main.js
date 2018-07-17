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

// // implement strategy 3
// guessables = [];
// success_rate = {};

function storeAnswer(correctAnswer) {
  return function(guessedAnswer) {
    return (guessedAnswer == correctAnswer);
  }
}

function handleCheckAnswer(correctAnswer) {
  normalizedAnswer = correctAnswer.toLowerCase();
  return function(letter, i) {
    return (normalizedAnswer[i] == letter);
  }
}

function guess(letter, checkHandler) {
  return (!badGuesses.includes(letter) && checkHandler(letter, i));
}

// TODO rewrite function to guess a letter regardless of index
function guessManager(knownSlots, checkHandler) {
  var badGuesses = {};
  var possibleGuesses = 'abcdefghijklmnopqrstuvwxyz'.split();
  for (var i=0; i < knownSlots.length; i++) {
    // guess unknown letter
    if (!knownSlots[i]) {
      // TODO can this branch be unreached and leave 1+ empty slot?
      for (var letter of possibleGuesses) {
        if (guess(letter, checkHandler)) {
          knownSlots[i] = letter;
          break;
        } else {
          badGuesses[letter] = badGuesses.includes(letter) ? [...badGuesses[letter], i] : [i];
        }
      }
    } else {
      continue;   // correct letter known
    }
  }
  return knownSlots;
}

// TODO create puzzle generator
var puzzle = {
  answer: 'splash',
  slots: ['', '', '', 'a', '', '']
};
var checker = handleCheckAnswer(puzzle.answer);
guessManager(puzzle.slots, checker);
