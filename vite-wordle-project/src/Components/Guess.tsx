

interface Props {
  word: string,
  guess: string,
  isGuessed: boolean
}

function Guess ({guess}: Props) {
  
  return(
    <div className="flex gap-2 mb-2">
      {Array(5).fill(0).map((_, index) => {
      return (
        <div className='flex items-center justify-center border w-12 h-12 text-white font-bold text-3xl'>{guess.toUpperCase()[index]}</div>
      )
    })}
    </div>
  )
}

export default Guess