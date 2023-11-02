import wordBank from '../word-bank.json'

const MATCH_STATUS = {
  CORRECT: 'Correct',
  INCLUDE: 'Include',
  MISS: 'Miss'
}

function charCount(str:string, letter:string) {
  let count = 0;
  for (let position = 0; position < str.length; position++) {
    if (str.charAt(position) === letter) {
      count += 1;
    }
  }
  return count;
}

function countAnswer(word:string) {
  let test: {[key:string]: number } = {};
  let wordArray = word.split('')
  wordArray.forEach((letter:string) => {
    test[letter] = charCount(word, letter);
  });
  return test;
}

export function computeGuess(guess:string, answer:string) {
  const answerCount = countAnswer(answer)

  let result: string[] = []
  const answerArray = answer.split('')
  const guessArray = guess.split('')

  guessArray.forEach((letter, index) => {
    const currentAnswerLetter = answerArray[index]

    if(currentAnswerLetter === letter) {
      result.push(MATCH_STATUS.CORRECT)
    } else if(answerArray.includes(letter)) {
      result.push(MATCH_STATUS.INCLUDE)
  } else {
      result.push(MATCH_STATUS.MISS)
  }
})

  result.forEach((curResult, resultIndex) => {
    if(curResult !== MATCH_STATUS.INCLUDE) {
      return
    }
    const guessLetter = guessArray[resultIndex]

    answerArray.forEach((currentAnswerLetter, answerIndex) => {
      if(currentAnswerLetter !== guessLetter) {
        return
      }
      if(result[answerIndex] === MATCH_STATUS.CORRECT) {
        if(answerCount[guessLetter] > 1) {
          result[resultIndex] = MATCH_STATUS.INCLUDE
        } else {
          result[resultIndex] = MATCH_STATUS.MISS
        }
      }
    })
  })
  return result
}

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordBank.length)
  console.log(randomIndex)
  return wordBank[randomIndex]
}

export const answer = getRandomWord()