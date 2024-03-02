import * as Dialog from '@radix-ui/react-dialog'
import '../modal.css'
import { useRef } from 'react'
import { SaveToLocalStorage } from '../../../utils/utils'

interface Props {
    isOpen: boolean
    startGame: () => void
}

const PlayerDataModal: React.FC<Props> = ({ isOpen, startGame }) => {
    const nameRef = useRef<HTMLInputElement>(null)

    const onSubmit = async () => {
        const playerName = nameRef.current?.value
        SaveToLocalStorage('player-name', playerName as string)
        startGame()
    }

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle font-mono text-2xl">
                        Free the Balloons
                    </Dialog.Title>
                    <Dialog.Description className="DialogDescription font-mono">
                        Enter your name to start playing..!
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <input
                            ref={nameRef}
                            className="Input"
                            id="name"
                            defaultValue="John Doe"
                        />
                    </fieldset>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            marginTop: 25,
                            justifyContent: 'center',
                        }}
                    >
                        <Dialog.Close asChild>
                            <button
                                className="Button green font-mono"
                                onClick={() => {
                                    onSubmit()
                                }}
                            >
                                Play
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default PlayerDataModal
