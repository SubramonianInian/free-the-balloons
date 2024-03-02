import { useEffect } from 'react'

interface Props {
    startTimer: boolean
    seconds: number
    setSeconds: (seconds: number) => void
}

const Timer = ({ startTimer, seconds, setSeconds }: Props) => {
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

    const secondsToHMS = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const formattedSeconds =
            remainingSeconds < 10
                ? `0${remainingSeconds}`
                : `${remainingSeconds}`

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    }

    return (
        startTimer && (
            <div className="relative text-center font-mono">
                <h1 className="text-3xl font-bold text-gray-800">
                    Time's ticking :{' '}
                    <span id="timer" className="text-blue-500">
                        {secondsToHMS(seconds)}
                    </span>
                </h1>
            </div>
        )
    )
}

export default Timer
