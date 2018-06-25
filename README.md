# Hangman Solver

Naïve letter guesser when faced with a fixed number of known and unknown letters representing a single word.

## Motivation

I've run into a couple fill-in-the-blank word guessing parodies that rely on the "hangman" mechanics with only a small number of known letters. Most recently, they were funny fillouts of "Wheel" gameshow-style boards. My mind immediately jumped to an algorithm that could propose common and uncommon solutions. As a first step down this road, I realized I'd need to build out a hangman solver.

## Structure

This implementation relies on three components:
1. Game Manager -  start up and manage turns, score and end state
2. Solution Manager - select a word in a language and validate guesses
3. Guesser - search for a potential word and propose a letter
  - when matching words are known, propose a common letter from matching set
  - when no words are known, propose a common letter from all words in the language
