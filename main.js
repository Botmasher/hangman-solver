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

function storeAnswer(correctAnswer) {
  return function(guessedAnswer) {
    return (guessedAnswer == correctAnswer);
  }
}

function linearHandleCheckAnswer(correctAnswer) {
  normalizedAnswer = correctAnswer.toLowerCase();
  return function(letter, i) {
    return (normalizedAnswer[i] == letter);
  }
}

function guess(letter, checkHandler, i) {
  return (!badGuesses.includes(letter) && checkHandler(letter, i));
}

function handleCheckAnswer(answer) {
  return function(letter) {
    return answer.split('').map((l, i) => {
      if (letter === l) {
        return i;
      }
    });
  }
}

// guess a letter regardless of index
function guessManager(knownSlots, guessHandler) {
  const guesses = {};
  const possibleGuesses = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .filter(guess => !knownSlots.includes(guess))
  ;
  // guess unknown letter
  possibleGuesses.map(letter => {
    let letterIds = guessHandler(letter);
    for (letterId of letterIds) {
      if (letterId > -1) {
        knownSlots[letterId] = letter;
        guesses[letter] = true;
        // finished filling out the answer
        if (!knownSlots.includes('')) {
          return knownSlots;
        }
      } else {
        guesses[letter] = false;
      }
    }
  });
  return knownSlots;
}

// guess index by index
function guessManagerLinear(knownSlots, checkHandler) {
  var badGuesses = {};
  var possibleGuesses = 'abcdefghijklmnopqrstuvwxyz'.split();
  for (var i=0; i < knownSlots.length; i++) {
    // guess unknown letter
    if (!knownSlots[i]) {
      // TODO can this branch be unreached and leave 1+ empty slot?
      for (var letter of possibleGuesses) {
        if (guess(letter, checkHandler, i)) {
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
const puzzle = {
  answer: 'splash',
  slots: ['', '', '', 'a', '', '']
};

//const linearChecker = linearHandleCheckAnswer(puzzle.answer);
//guessManagerLinear(puzzle.slots, linearChecker);

const checker = handleCheckAnswer(puzzle.answer);
console.log(guessManager(puzzle.slots, checker));
