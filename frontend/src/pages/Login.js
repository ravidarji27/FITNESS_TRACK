import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/home', { replace: true }); // Prevent navigating back to login
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Show a loading spinner until the authentication state stabilizes
  if (loading) {
    return (
      <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
      >
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
    );
  }

  // Avoid rendering login form if user is already authenticated
  if (!userInfo) {
    
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" block="true" className="mt-4">
                  Login
                </Button>
              </Form>

              <div className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign Up</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}};

export default Login;
