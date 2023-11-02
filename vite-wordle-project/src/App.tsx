import { useState, useEffect } from 'react';
import './App.css'
import Guess from './Components/Guess'
import "./index.css";
import { getRandomWord } from './Utils/word-utils';
import wordBank from './word-bank.json'

function App() {
  const [guessRound, setGuessRound] = useState<string[]>(['', '', '', '', '', ''])
  const [currentRound, setCurrentRound] = useState<number>(0)
  const [answer, setAnswer] = useState(getRandomWord())

  const [isComplete, setIsComplete] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  const [hasGivenUp, setHasGivenUp] = useState(false)
  const MAX_GUESS = 6

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isComplete, isEmpty, hasGivenUp])

  useEffect(() => {
    const currentRoundGuess = guessRound[currentRound]
    const isRoundComplete = currentRoundGuess.length === 5
    const isRoundEmpty = currentRoundGuess.length === 0
    
    setIsComplete(isRoundComplete)
    setIsEmpty(isRoundEmpty)
  }, [guessRound])


  const isWin = (guessRound[currentRound - 1] === answer)
  const isLost = (currentRound === MAX_GUESS) 

  const handleReset = () => {
      setGuessRound(['', '', '', '', '', ''])
      setCurrentRound(0)
      setAnswer(getRandomWord)
      setHasGivenUp(false)
  }

  const handleGivenUp = () => {
      setHasGivenUp(true)
      setCurrentRound(prev => prev + 1)
  }

  const handleKeyPress = (e: any) => {
    if(isWin || isLost || hasGivenUp) {
      return
    }

    if (e.key === 'Enter') {
      if(isComplete && wordBank.includes(guessRound[currentRound])) {
        setCurrentRound(prev => prev + 1)
        return setIsComplete(false)
      }
      return
    }

    if (e.key === 'Backspace') {
      if (!isEmpty) {
        setGuessRound(prev => {
        return prev.map((item, index) => {
          if (index === currentRound) {
            return (item = item.slice(0, -1));
          }
          return item;
        });
      })
    }
      return
    }

    if (e.key.length > 1) {
      return
    }

    if (!isComplete && e.key.match(/[A-z]/)) {
      setGuessRound(prev => {
        return prev.map((item, index) => {
          if (index === currentRound) {
            return (item += e.key.toLowerCase());
          }
          return item;
        });
    });
    }
  }

  return (
    <div className="flex flex-col w-full h-screen items-center bg-slate-800">
       <div className='absolute inset-1/4 flex flex-col items-center'>
          <h1 className='text-5xl mb-10 font-bold text-slate-500'>Wordle</h1>
          {Array(MAX_GUESS).fill(0).map((_, index) => {
            return(
              <Guess key={index} word={answer} guess={guessRound[index]} isGuessed={index < currentRound} />
            )
          })}
          {hasGivenUp && <h1>{answer}</h1>}
          {!hasGivenUp && <button className=' text-slate-500 mt-2' onClick={handleGivenUp}>Show me the answer</button>}
          {isWin && <h1 className=' text-indigo-300 mt-5'>Congratulations! You won!</h1>}
          {isLost && <h1 className=' text-gray-400 mt-5'>Oops! Better luck tomorrow!</h1>}
          {(isWin || isLost || hasGivenUp) && <button className=' text-slate-500 mt-2' onClick={handleReset}>Play Again</button>}
      </div>
        
    </div>
  )
}

export default App
