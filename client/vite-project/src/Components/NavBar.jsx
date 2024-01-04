import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import {Container, Nav, Navbar, Stack} from "react-bootstrap"
import {Link} from "react-router-dom"
export default function NavBar() {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}}>
      <Container>
        <h2>
            <Link to="/" className="link-light text-decoration-none">Fada</Link>
        </h2>
        { user && <span className="text-warning"> Logged in as {user?.name} </span> }
        <Nav >
            <Stack direction="horizontal" gap={4}>
                {user && (<>
                  <Link to="/Login" onClick={()=> logoutUser()} className="link-light text-decoration-none">Logout</Link>
                </>)}
                {!user && (
                  <>
                    <Link to="/Login" className="link-light text-decoration-none">Login</Link>
                    <Link to="/Register" className="link-light text-decoration-none">Register</Link>
                  </>
                ) }
                
            </Stack>
        </Nav>
      </Container>
    </Navbar>
  )
}
