import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateWorkFlow from "./components/CreateWorkFlow.tsx"
import { UserSpace } from "./components/UserSpace"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { isAuthed } from "./lib/auth"
import { Workflow } from "./pages/Workflow.tsx"


function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuthed() ? <UserSpace /> : <Navigate to="/signin" replace />}
          />
          <Route
            path="/workflow/new"
            element={isAuthed() ? <CreateWorkFlow /> : <Navigate to="/signin" replace />}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/workflow/:workflowId" element={<Workflow />} />
          
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App;