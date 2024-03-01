import { useEffect } from 'react'

interface TimerProps {
    startTimer: boolean
    seconds: number
    setSeconds: (seconds: number) => void
}
const Timer = ({ startTimer, seconds, setSeconds }: TimerProps) => {
    useEffect(() => {
        let interval: any = 0
        if (startTimer) {
            interval = setInterval(() => {
                setSeconds(seconds + 1)
            }, 1000)
        } else if (!startTimer && seconds !== 0) {
            clearInterval(interval)
        }

        if (!startTimer) {
            setSeconds(0)
            setSeconds(seconds)
        }
        return () => clearInterval(interval)
    }, [startTimer, seconds])

    return (
        startTimer && (
            <div>
                <h1>Timer: {seconds} seconds</h1>
            </div>
        )
    )
}

export default Timer
