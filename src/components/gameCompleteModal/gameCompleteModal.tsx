import * as Dialog from '@radix-ui/react-dialog'
import './gameCompleteModal.css'
import { ColorRing } from 'react-loader-spinner'
import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
interface props {
    isOpen: boolean
    time: number
    startGame: () => void
}

interface Player {
    name: string
    time: number
}
const GameCompleteModal = ({ isOpen, time, startGame }: props) => {
    const [leaders, setLeaders] = useState<Player[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getAllLeaders = async () => {
            try {
                console.info('Saving player score')
                const data: Player[] = []
                const playersRef = collection(db, 'players')
                await addDoc(playersRef, {
                    name: localStorage.getItem('player-name') || '',
                    time: time,
                }).then((doc) => console.log(doc.id))
                const snapshot = await getDocs(playersRef)
                snapshot.forEach((doc) => {
                    const player = doc.data() as Player
                    data.push({ name: player.name, time: player.time })
                })
                setIsLoading(false)
                setLeaders(data.sort((a, b) => a.time - b.time).slice(0, 10))
            } catch (error) {
                console.error('Error fetching leaders:', error)
                setIsLoading(false)
            }
        }
        if (isOpen) {
            setIsLoading(true)
            getAllLeaders()
        }
    }, [time, isOpen])
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                        Hurray...! You freed all the balloons in {time} seconds.
                    </Dialog.Title>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {isLoading && (
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={[
                                    '#e15b64',
                                    '#f47e60',
                                    '#f8b26a',
                                    '#abbd81',
                                    '#849b87',
                                ]}
                            />
                        )}
                        {!isLoading && (
                            <table style={{ width: '100%', marginTop: '1rem' }}>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaders?.map(
                                        (player: Player, index: number) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{player.name}</td>
                                                <td>{player.time}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        )}
                        <Dialog.Close asChild>
                            <button
                                style={{ width: '100%', marginTop: '1rem' }}
                                className="Button green"
                                onClick={() => {
                                    startGame()
                                }}
                            >
                                Play Again
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default GameCompleteModal
