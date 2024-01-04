import {Routes, Route, Navigate} from "react-router-dom"
import Chat from "./pages/Chat"
import Register from "./pages/Registers"
import Login from "./pages/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import NavBar from "./Components/NavBar"
import { useContext } from "react"
import { ChatContentProvider } from "./Context/ChatContext";
import { AuthContext } from './Context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  return (
   
      <ChatContentProvider user ={user}>
        <NavBar/>
        <Container className="text-secondary">
        <Routes >
          <Route path="/" element = {user? <Chat/>: <Login/>} />
          <Route path="/register" element = {user? <Chat/>: <Register/>} />
          <Route path="/login" element = {user? <Chat/>: <Login/>}/>
          <Route path="*" element = {<Navigate to="/" />}/>
        </Routes>
        </Container>
      </ChatContentProvider>
  )
}

export default App
