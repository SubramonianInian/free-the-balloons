import { useState } from 'react'
import './App.css'
import Balloon from './components/balloon'
import Timer from './components/timer/timer'

function App() {
    const balloons = 100
    const [start, setStart] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [startTimer, setStartTimer] = useState<boolean>(true)
    const [numberOfBalloons, setNumberOfBalloons] = useState<number>(balloons)
    const [completionInSeconds, setCompletionInSeconds] = useState<number>(0)

    const onPop = (numberOfBalloons: number) => {
        setNumberOfBalloons(numberOfBalloons)
        console.log(numberOfBalloons)
        if (numberOfBalloons === 0) {
            setGameOver(true)
            setStartTimer(false)
        }
    }
    const startGame = () => {
        setStart(true)
    }

    const playAgain = () => {
        setGameOver(false)
        setStartTimer(true)
        setNumberOfBalloons(balloons)
    }

    if (gameOver) {
        return (
            <>
                <div>
                    Hurray all balloons popped in {completionInSeconds} seconds
                </div>
                <button onClick={() => playAgain()}>Play Again</button>
            </>
        )
    }
    if (!start) {
        return (
            <button
                onClick={() => {
                    startGame()
                }}
            >
                start
            </button>
        )
    }
    return (
        <div className="container">
            <Timer
                startTimer={startTimer}
                setCompletionInSeconds={setCompletionInSeconds}
            />
            <Balloon numberOfBalloons={numberOfBalloons} onPop={onPop} />
        </div>
    )
}

export default App
