import { useState } from 'react'
import './App.css'
import Balloon from './components/balloon/balloon'
import Timer from './components/timer/timer'
import backgroundMusic from '../public/Louis Adrien - Bouncing to the Bop.mp3'
import PlayerDataModal from './components/playerDataModal/playerDataModal'

import GameCompleteModal from './components/gameCompleteModal/gameCompleteModal'
function App() {
    const balloons = 30
    const [showPlayerInfoModal, setShowPlayerInfoModal] =
        useState<boolean>(true)
    const [showGameCompleteModal, setshowGameCompleteModal] =
        useState<boolean>(false)
    const [audio] = useState(new Audio(backgroundMusic))
    const [start, setStart] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(0)
    const [startTimer, setStartTimer] = useState<boolean>(true)
    const [numberOfBalloons, setNumberOfBalloons] = useState<number>(balloons)

    const onPop = async (numberOfBalloons: number) => {
        setNumberOfBalloons(numberOfBalloons)
        if (numberOfBalloons === 0) {
            audio.pause()
            setStart(false)
            setStartTimer(false)
            setshowGameCompleteModal(true)
        }
    }

    const startGame = () => {
        setShowPlayerInfoModal(false)
        setshowGameCompleteModal(false)
        audio.play()
        setStart(true)
        setSeconds(0)
        setStartTimer(true)
        setNumberOfBalloons(balloons)
    }

    return (
        <>
            <PlayerDataModal
                isOpen={showPlayerInfoModal}
                startGame={startGame}
            />
            <GameCompleteModal
                isOpen={showGameCompleteModal}
                time={seconds}
                startGame={startGame}
            />
            {/* <audio controls={false} autoPlay={true} loop={true}>
                <source src={backgroundMusic} type="audio/mp3" />
            </audio> */}
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
        </>
    )
}

export default App
