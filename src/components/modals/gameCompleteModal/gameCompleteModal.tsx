import * as Dialog from '@radix-ui/react-dialog'
import '../modal.css'
import { ColorRing } from 'react-loader-spinner'
import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { GetFromLocalStorage } from '../../../utils/utils'
import { Player } from '../../../interfaces/player'
import LeaderBoard from '../../leaderBoard/leaderBoard'
import RenderIf from '../../utility/renderIf'

interface Props {
    isOpen: boolean
    time: number
    startGame: () => void
}

const GameCompleteModal: React.FC<Props> = ({ isOpen, time, startGame }) => {
    const [leaders, setLeaders] = useState<Player[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getAllLeaders = async () => {
            try {
                const data: Player[] = []
                const playersRef = collection(db, 'players')
                await addDoc(playersRef, {
                    name: GetFromLocalStorage('player-name') || '',
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
                    <Dialog.Title className="DialogTitle font-serif">
                        <h1 className="font-medium text-gray-800">
                            Hurray...! You freed all the balloons in{' '}
                            <span id="timer" className="text-blue-500">
                                {time}{' '}
                            </span>
                            seconds. 🎉
                        </h1>
                    </Dialog.Title>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <RenderIf condition={isLoading}>
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
                        </RenderIf>
                        <RenderIf condition={!isLoading}>
                            <LeaderBoard leaders={leaders} />
                        </RenderIf>
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
