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

// TODO communicate with Manager
known = ['', '', '', 'a', '', ''];

// implement strategy 3
guessables = [];
success_rate = {};

function guess() {
  return;
}

guess();
