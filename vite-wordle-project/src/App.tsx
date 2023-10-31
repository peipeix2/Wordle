import { useState, useEffect } from 'react';
import './App.css'
import Guess from './Components/Guess'
import "./index.css";

function App() {
  const [guessRound, setGuessRound] = useState<string[]>(['guess', 'glory', 'grail', 'ed', '', ''])
  const [currentRound, setCurrentRound] = useState<number>(0)
  const MAX_GUESS = 6
  const answer = 'grail'

  useEffect(() => {
      window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [guessRound, currentRound])
  

  const submitGuess = () => {
    if (guessRound[currentRound].length === 5) {
      setCurrentRound(prev => prev + 1)
    }
  }

  const handleKeyPress = (e: any) => {
    // Phase-3待修改：現在key-in出5個字就會出現答案，要按Enter才會換行，還在思考解決辦法
    if (e.key === 'Enter') {
      return submitGuess()
    }

    if (e.key === 'Backspace') {
      if (guessRound[currentRound].length > 0) {
        const updatedGuessRound = [...guessRound]
        const newWord = updatedGuessRound[currentRound].slice(0, -1)
        updatedGuessRound[currentRound] = newWord 
        return setGuessRound(updatedGuessRound)
      }
      return
    }

    if (guessRound[currentRound].length < 5) {
      const updatedGuessRound = [...guessRound]
      updatedGuessRound[currentRound] += e.key.toLowerCase()
      setGuessRound(updatedGuessRound)
    }
  }

  return (
    <div className="flex w-full h-screen items-center bg-slate-800">
       <div className='flex flex-col m-auto items-center'>
          <h1 className='text-5xl mb-10 font-bold text-slate-500'>Wordle</h1>
          {Array(MAX_GUESS).fill(0).map((_, index) => {
            return(
              <Guess key={index} word={answer} guess={guessRound[index]} />
            )
          })}
        </div>
    </div>
  )
}

export default App
