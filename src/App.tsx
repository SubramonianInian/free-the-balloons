import { useState } from 'react'
import './App.css'
import Balloon from './components/balloon/balloon'
import Timer from './components/timer/timer'
import backgroundMusic from '../public/Louis Adrien - Bouncing to the Bop.mp3'
import PlayerDataModal from './components/modals/playerDataModal/playerDataModal'
import GameCompleteModal from './components/modals/gameCompleteModal/gameCompleteModal'
import RenderIf from './components/utility/renderIf'

const audio = new Audio(backgroundMusic)
const balloons = import.meta.env.VITE_NUMBER_OF_BALLOONS

function App() {
    const [start, setStart] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [startTimer, setStartTimer] = useState(true)
    const [numberOfBalloons, setNumberOfBalloons] = useState(balloons)
    const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(true)
    const [showGameCompleteModal, setShowGameCompleteModal] = useState(false)

    const onPop = (updatedBalloons: number) => {
        setNumberOfBalloons(updatedBalloons)
        if (updatedBalloons === 0) {
            audio.pause()
            setStart(false)
            setStartTimer(false)
            setShowGameCompleteModal(true)
        }
    }

    const startGame = () => {
        setShowPlayerInfoModal(false)
        setShowGameCompleteModal(false)
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
            <RenderIf condition={start}>
                <Timer
                    startTimer={startTimer}
                    seconds={seconds}
                    setSeconds={setSeconds}
                />
                <Balloon
                    start={start}
                    numberOfBalloons={numberOfBalloons}
                    onPop={onPop}
                />
            </RenderIf>
        </>
    )
}

export default App
