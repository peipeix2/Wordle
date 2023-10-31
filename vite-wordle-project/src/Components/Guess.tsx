
interface Props {
  word: string,
  guess: string,
}

enum COLOR_STATUS {
  Correct = "bg-[#498148] border-[#498148]",
  Include = "bg-[#ab943e] border-[#ab943e]",
  Miss = "bg-[#333334] border-[#333334]",
  NotGuessed = 'bg-black border-[#333335]'
}

function Guess ({word, guess}: Props) {
  
  return(
    <div className="flex gap-2 mb-2">
      {Array(5).fill(0).map((_, index) => {
        const backgroundColor = 
        (guess.length !== 0) ? 
        word[index] === guess[index] ? COLOR_STATUS.Correct : word.includes(guess[index]) ? COLOR_STATUS.Include : COLOR_STATUS.Miss : COLOR_STATUS.NotGuessed

      return (
        <div key={index} className={`flex items-center justify-center border w-12 h-12 text-white font-bold text-3xl ${backgroundColor}`}>{guess.toUpperCase()[index]}</div>
      )
    })}
    </div>
  )
}

export default Guess