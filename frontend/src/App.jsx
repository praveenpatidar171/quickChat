import { Route, Routes } from "react-router-dom"
import { HomePage } from "./page/HomePage"
import { SignUp } from "./page/SignUp"
import { SignIn } from "./page/SignIn"
import bgImage from './assets/bg.avif'

function App() {

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} className="h-screen w-screen flex justify-center items-center">
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignIn />} path="/signin" />
      </Routes>
    </div>
  )
}

export default App
