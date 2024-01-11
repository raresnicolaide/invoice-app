import { useDispatch } from "react-redux"
import { Modal, ModalContents, ModalOpenButton } from "./components/modal"
import { useLoginMutation } from "./redux/api"
import { useNavigate } from "react-router"
import { setCredentials } from "./redux/authSlice"
import LoadingSpinner from "./components/loading-spinner"

interface IUserCreditentials {
  email: string
  password: string
}

interface LoginFormProps {
  onSubmit: (userCreditentials: IUserCreditentials) => void
  action: string
  isLoading: boolean
}

function LoginForm({ onSubmit, action, isLoading }: LoginFormProps) {
  return (
    <form
      className="flex flex-col items-stretch"
      onSubmit={(event) => {
        event.preventDefault()

        const {
          email: { value: email },
          password: { value: password },
        } = event.target.elements

        onSubmit({ email, password })
      }}
    >
      <div className="m-2 mx-auto w-full max-w-[300px]">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border border-solid border-gray-300 bg-gray-200 p-2 rounded-md"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>

            <input
              className="border border-solid border-gray-300 bg-gray-200 p-2 rounded-md"
              id="password"
              type="password"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center m-2 mx-auto w-full max-w-[300px]">
        <button
          className="bg-indigo-700 w-[95px] text-white p-2 border-0 rounded-md"
          type="submit"
        >
          {isLoading ? (
            <span className="flex gap-x-4">
              <LoadingSpinner /> {action}
            </span>
          ) : (
            action
          )}
        </button>
      </div>
    </form>
  )
}

function UnauthenticatedApp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const handleLogin = async ({ email, password }: IUserCreditentials) => {
    try {
      const user = await login({ email, password })

      if ("data" in user) {
        dispatch(setCredentials(user.data))
        navigate("/invoices")
      }
    } catch (error) {
      console.error("Login failed with error:", error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="font-extrabold text-2xl my-4">Invoice App</h1>
      <div className="grid grid-cols-2 gap-3">
        <Modal>
          <ModalOpenButton
            renderButton={(setIsOpen) => (
              <button
                className="bg-indigo-700 text-white p-2 border-0 rounded-md"
                onClick={setIsOpen}
              >
                Login
              </button>
            )}
          />
          <ModalContents title="Login">
            <LoginForm
              isLoading={isLoading}
              onSubmit={handleLogin}
              action="Login"
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton
            renderButton={(setIsOpen) => (
              <button
                className="bg-gray-300 text-black p-2 border-0 rounded-md"
                onClick={setIsOpen}
              >
                Register
              </button>
            )}
          />
          <ModalContents title="Register">
            <LoginForm
              onSubmit={() => {}}
              action="Actually not implemented :("
              isLoading={false}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
