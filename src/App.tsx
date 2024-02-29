import { useState } from 'react'
import './App.css'
import Balloon from './components/balloon'
import Timer from './components/timer/timer'

function App() {
    const balloons = 30
    const [start, setStart] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(0)
    const [startTimer, setStartTimer] = useState<boolean>(true)
    const [numberOfBalloons, setNumberOfBalloons] = useState<number>(balloons)

    const onPop = (numberOfBalloons: number) => {
        setNumberOfBalloons(numberOfBalloons)
        console.log(numberOfBalloons)
        if (numberOfBalloons === 0) {
            setGameOver(true)
            setStart(false)
            setStartTimer(false)
        }
    }
    const startGame = () => {
        setStart(true)
        setSeconds(0)
        setGameOver(false)
        setStartTimer(true)
        setNumberOfBalloons(balloons)
    }

    const GameOver = () => {
        return (
            gameOver && (
                <>
                    <div>
                        Hurray you freed all the balloons in {seconds} seconds
                    </div>
                </>
            )
        )
    }

    const StartGame = () => {
        return (
            !start && (
                <button
                    onClick={() => {
                        startGame()
                    }}
                >
                    Free the Balloons
                </button>
            )
        )
    }
    return (
        <div className="container">
            <GameOver />
            <StartGame />
            {start && (
                <Timer
                    startTimer={startTimer}
                    seconds={seconds}
                    setSeconds={setSeconds}
                />
            )}
            {start && (
                <Balloon
                    start={start}
                    numberOfBalloons={numberOfBalloons}
                    onPop={onPop}
                />
            )}
        </div>
    )
}

export default App
