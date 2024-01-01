import {Form, Alert, Button, Col, Row, Stack} from 'react-bootstrap'
export default function Login() {
  return (
    <div>
      <Form>
        <Row style={{height: "100vh", display: "flex", alignItems: "center", justifyContent:"center", paddingTop: "10%" }}>
            <Col xs={6}>
                <h3>Login</h3>
                <Stack gap={4}>
                    <Form.Control type='email' placeholder='Email' />
                    <Form.Control type='password' placeholder='Password' />
                    <Button variant='warning'>Login</Button>
                    <Alert variant='danger'><p>An error occured</p></Alert>
                </Stack>
            </Col>
        </Row>
      </Form>
    </div>
  )
}
