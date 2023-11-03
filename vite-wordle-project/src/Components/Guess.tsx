import { computeGuess, MATCH_STATUS } from "../Utils/word-utils";

interface Props {
  word: string,
  guess: string,
  isGuessed: boolean;
}

enum COLOR_STATUS {
  Correct = "bg-[#498148] border-[#498148]",
  Include = "bg-[#ab943e] border-[#ab943e]",
  Miss = "bg-[#333334] border-[#333334]",
  NotGuessed = 'bg-black border-[#333335]',
  Typing = 'bg-black border-[#565758]'
}

function Guess ({word, guess, isGuessed}: Props) {
  const MAX_LETTERS = 5

  const isInputEmpty = (guess.length === 0)

  const computeStyle = (index:number) => {
      const result = computeGuess(guess, word)
      if (result[index] === MATCH_STATUS.CORRECT) {
        return COLOR_STATUS.Correct
      }
      if (result[index] === MATCH_STATUS.INCLUDE) {
        return COLOR_STATUS.Include
      }
      if (result[index] === MATCH_STATUS.MISS) {
        return COLOR_STATUS.Miss
      }  
  }

  
  return(
    <div className="flex gap-2 mb-2">
      {Array(MAX_LETTERS).fill(0).map((_, index) => {
        const backgroundColor = 
        isGuessed ?
        (!isInputEmpty) ? computeStyle(index) : COLOR_STATUS.NotGuessed :
        (guess[index] !== undefined) ? COLOR_STATUS.Typing : COLOR_STATUS.NotGuessed
      return (
        <div key={index} className={`flex items-center justify-center border w-12 h-12 text-white font-bold text-3xl ${backgroundColor}`}>{guess.toUpperCase()[index]}</div>
      )
    })}
    </div>
  )
}

export default Guess