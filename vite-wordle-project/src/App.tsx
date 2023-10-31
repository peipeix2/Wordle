import './App.css'
import Guess from './Components/Guess'
import "./index.css";

function App() {
  const guessRound: string[] = ['guess', 'gorge', 'grail', 'ed', '', '']

  return (
    <div className="flex w-full h-screen items-center bg-slate-800">
       <div className='flex flex-col m-auto items-center'>
          <h1 className='text-5xl mb-10 font-bold text-slate-500'>Wordle</h1>
          {guessRound.map((_, index) => {
            return(
              <Guess key={index} word={"grail"} guess={guessRound[index]} />
            )
          })}
        </div>
    </div>
  )
}

export default App
