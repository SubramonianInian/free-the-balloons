import { useState, useEffect } from 'react'

interface TimerProps {
    startTimer: boolean
    setCompletionInSeconds: (seconds: number) => void
}
const Timer = ({ startTimer, setCompletionInSeconds }: TimerProps) => {
    const [seconds, setSeconds] = useState<number>(0)

    useEffect(() => {
        let interval: number = 0
        if (startTimer) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)
        } else if (!startTimer && seconds !== 0) {
            clearInterval(interval)
        }

        if (!startTimer) {
            setCompletionInSeconds(seconds)
        }
        return () => clearInterval(interval)
    }, [startTimer, seconds])

    // const toggleTimer = () => {
    //     setIsActive((prevIsActive) => !prevIsActive)
    // }

    // const resetTimer = () => {
    //     setSeconds(0)
    // }

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    )
}

export default Timer
