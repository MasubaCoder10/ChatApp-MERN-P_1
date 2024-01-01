import { useContext } from 'react'
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext';

export default function Registers() {
  const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);
   
  return (
    <div>
      <Form onSubmit={registerUser}>  
        <Row style={{height: "100vh", display: "flex", alignItems: "center", justifyContent:"center", paddingTop: "10%" }}>
          <Col xs={6}>
            <h3>Register</h3>
            <Stack gap={4}>
              
              <Form.Control type='text' placeholder='Name' onChange={(e)=>{updateRegisterInfo({...registerInfo, name: e.target.value})}}/>
              <Form.Control type='email' placeholder='Email' onChange={(e)=>{updateRegisterInfo({...registerInfo, email: e.target.value})}}/>
              <Form.Control type='password' placeholder='Password' onChange={(e)=>{updateRegisterInfo({...registerInfo, password: e.target.value})}}/>

              <Button variant='warning' type='submit' >{isRegisterLoading ? "Creating your account" : "register"}</Button>
              {registerError?.error && (
                <Alert variant='danger'>
                <p> {registerError?.message} </p>
              </Alert>
              )}
              
            </Stack>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
