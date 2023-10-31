

interface Props {
  word: string,
  guess: string,
}

enum COLOR_STATUS {
  Correct = "bg-[#498148]",
  Include = "bg-[#ab943e]",
  Miss = "bg-[#333334]"
}

function Guess ({word, guess}: Props) {
  
  return(
    <div className="flex gap-2 mb-2">
      {Array(5).fill(0).map((_, index) => {
        const backgroundColor =  
        word[index] === guess[index] ? COLOR_STATUS.Correct : word.includes(guess[index]) ? COLOR_STATUS.Include : COLOR_STATUS.Miss
        

      return (
        <div className={`flex items-center justify-center border w-12 h-12 text-white font-bold text-3xl ${backgroundColor}`}>{guess.toUpperCase()[index]}</div>
      )
    })}
    </div>
  )
}

export default Guess