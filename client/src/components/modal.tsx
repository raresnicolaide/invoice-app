import { ReactNode, createContext, useContext, useState } from "react"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"

interface IModalContext {
  isOpen: boolean
  setIsOpen: (newState: boolean) => void
}
const ModalContext = createContext<IModalContext>({
  isOpen: false,
  setIsOpen: () => {},
})

interface ModalProps {
  children: ReactNode
}
function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

interface ModalDismissButtonProps {
  renderButton: (setIsOpen: () => void) => ReactNode
}
function ModalDismissButton({ renderButton }: ModalDismissButtonProps) {
  const { setIsOpen } = useContext(ModalContext)
  return <>{renderButton(() => setIsOpen(false))}</>
}

interface ModalOpenButtonProps {
  renderButton: (setIsOpen: () => void) => ReactNode
}
function ModalOpenButton({ renderButton }: ModalOpenButtonProps) {
  const { setIsOpen } = useContext(ModalContext)
  return <>{renderButton(() => setIsOpen(true))}</>
}

interface ModalContentsBaseProps {
  children: ReactNode
}
function ModalContentsBase({ children }: ModalContentsBaseProps) {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  return (
    <Dialog
      className="max-w-[450px] rounded-md pb-14 my-[20vh] mx-auto sm:w-full sm:my-[10vg] sm:mx-auto"
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
    >
      {children}
    </Dialog>
  )
}

interface ModalContentsProps {
  children: ReactNode
  title: string
}
function ModalContents({ title, children }: ModalContentsProps) {
  return (
    <ModalContentsBase>
      <div className="flex justify-end">
        <ModalDismissButton
          renderButton={(setIsOpen) => <button onClick={setIsOpen}>✖</button>}
        />
      </div>
      <h1 className="text-center text-xl font-extrabold">{title}</h1>
      {children}
    </ModalContentsBase>
  )
}

export { Modal, ModalContents, ModalDismissButton, ModalOpenButton }
