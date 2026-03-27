import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import ToastComponent from '../components/Toast';
import { useNavigate } from 'react-router-dom';

const Signup = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>

              {loading && <div className="text-center"><Spinner animation="border" /></div>}
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Button variant="primary" type="submit" className='mt-4'>
        Signup
      </Button>
    </Form>
    <div className="mt-3 text-center">
        Already have an account? <a href="/login">Login</a>
    </div>
    </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast for showing errors */}
      <ToastComponent show={showToast} setShow={setShowToast} message={error} variant="danger" />
    </Container>
  );
};

export default Signup;
