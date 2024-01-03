import { useContext } from 'react'
import {Form, Alert, Button, Col, Row, Stack} from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'
export default function Login() {
  const {loginError, isLoginLoading, updateLoginInfo, loginInfo, loginUser} = useContext(AuthContext);
  return (
    <div>
      <Form onSubmit={loginUser}>
        <Row style={{height: "100vh", display: "flex", alignItems: "center", justifyContent:"center", paddingTop: "10%" }}>
            <Col xs={6}>
                <h3>Login</h3>
                <Stack gap={4}>
                    <Form.Control type='email' placeholder='Email' onChange={(e)=>{updateLoginInfo({...loginInfo, email: e.target.value})}} />
                    <Form.Control type='password' placeholder='Password' onChange={(e)=>{updateLoginInfo({...loginInfo, password: e.target.value})}}/>

                    <Button variant='warning' type='submit'> {isLoginLoading ? "Login before": "Login"} </Button>

                    {loginError?.error && (
                    <Alert variant='danger'>
                    <p> {loginError?.message} </p>
                    </Alert>
                   )}
                </Stack>
            </Col>
        </Row>
      </Form>
    </div>
  )
}
