import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./routes/Signup";
import { Signin } from "./routes/Signin";
import { Dashboard } from "./routes/Dashboard";
import { Send } from "./routes/Send";
import './index.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/send" element={<Send />}/>
      </Routes>
    </Router>
  )
}

export default App;
