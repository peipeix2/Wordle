
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
  const isInputComplete = (guess.length === MAX_LETTERS)
  
  return(
    <div className="flex gap-2 mb-2">
      {Array(MAX_LETTERS).fill(0).map((_, index) => {
        const backgroundColor = 
        isGuessed &&
        (!isInputEmpty) ? 
        (!isInputComplete) ? (guess[index] !== undefined) ? COLOR_STATUS.Typing : COLOR_STATUS.NotGuessed:
        word[index] === guess[index] ? COLOR_STATUS.Correct : word.includes(guess[index]) ? COLOR_STATUS.Include : COLOR_STATUS.Miss : COLOR_STATUS.NotGuessed

      return (
        <div key={index} className={`flex items-center justify-center border w-12 h-12 text-white font-bold text-3xl ${backgroundColor}`}>{guess.toUpperCase()[index]}</div>
      )
    })}
    </div>
  )
}

export default Guess