import * as Dialog from '@radix-ui/react-dialog'
import './playerDataModal.css'
import { useRef } from 'react'
interface props {
    isOpen: boolean
    startGame: () => void
}

const PlayerDataModal = ({ isOpen, startGame }: props) => {
    const nameRef = useRef<HTMLInputElement>(null)

    const onSubmit = async () => {
        // save name to firebase database
        const playerName = nameRef.current?.value

        // set name to localstorage
        localStorage.setItem('player-name', playerName as string)

        // Toggle the modal
        startGame()
    }

    return (
        <Dialog.Root open={isOpen}>
            {/* <Dialog.Trigger asChild>
                <button className="Button violet">Edit profile</button>
            </Dialog.Trigger> */}
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                        Free the Balloons
                    </Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Enter your name to start playing..!
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <input
                            ref={nameRef}
                            className="Input"
                            id="name"
                            defaultValue=""
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
                                className="Button green"
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
