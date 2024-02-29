import { useState, useEffect } from 'react'
import './balloon/balloon.css'

interface Position {
    x: number
    y: number
}

interface Balloon {
    position: Position
    color: string
    isFlying: boolean
}
interface BalloonProps {
    numberOfBalloons: number
    onPop: (numberOfBalloons: number) => void
}

const Balloon = ({ numberOfBalloons, onPop }: BalloonProps) => {
    const [divs, setDivs] = useState<Balloon[]>([])

    useEffect(() => {
        const colors: string[] = [
            'hsl(215, 50%, 65%)',
            'hsl(245, 40%, 65%)',
            'hsl(139, 30%, 50%)',
            'hsl(59, 50%, 58%)',
            'hsl(59, 30%, 52%)',
            'hsl(23, 55%, 57%)',
            'hsl(23, 44%, 46%)',
            'hsl(215, 40%, 60%)',
            'hsl(245, 50%, 60%)',
            'hsl(139, 40%, 50%)',
            'hsl(59, 55%, 55%)',
            'hsl(59, 35%, 50%)',
            'hsl(23, 50%, 55%)',
            'hsl(23, 35%, 45%)',
        ]
        console.info('creating balloons')
        const generateRandomPosition = (): Position => {
            const minX = 0
            const maxX = window.innerWidth - 100
            const minY = 0
            const maxY = window.innerHeight - 100

            const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX
            const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY

            return { x: randomX, y: randomY }
        }
        const getRandomValueFromArray = (): string => {
            const randomIndex: number = Math.floor(
                Math.random() * colors.length
            )
            return colors[randomIndex]
        }
        // const randomHSL = (): string => {
        //     const hue = Math.floor(Math.random() * 360) // Random hue value between 0 and 359
        //     const saturation = Math.floor(Math.random() * 101) // Random saturation value between 0 and 100
        //     const lightness = Math.floor(Math.random() * 101) // Random lightness value between 0 and 100

        //     return `hsl(${hue}, ${saturation}%, ${lightness}%)`
        // }

        const newDivs: Balloon[] = []
        for (let i = 0; i < numberOfBalloons; i++) {
            const position = generateRandomPosition()
            const newBaloonInfo: Balloon = {
                isFlying: false,
                color: getRandomValueFromArray(),
                position: position,
            }
            newDivs.push(newBaloonInfo)
        }
        setDivs(newDivs)
    }, [])

    const handleClick = (index: number) => {
        const updatedDivs = [...divs.filter((x) => !x.isFlying)]
        console.log(updatedDivs)
        if (updatedDivs[index]) {
            updatedDivs[index].isFlying = true
            setDivs(updatedDivs)
            onPop(numberOfBalloons - 1)
        } else {
            setDivs([])
        }

        setTimeout(() => {
            const filteredDivs = divs.filter((_, i) => i !== index)
            setDivs(filteredDivs)
        }, 100)
    }
    return (
        <>
            {divs.map((balloon, index) => (
                <div
                    key={index}
                    className={`balloon ${balloon.isFlying ? 'flying' : ''}`}
                    style={{
                        top: balloon.position.y,
                        left: balloon.position.x,
                        backgroundColor: balloon.color,
                    }}
                    onClick={() => handleClick(index)}
                ></div>
            ))}
        </>
    )
}

export default Balloon