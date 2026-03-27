import React,{useState} from 'react';
import { Navbar, Nav, Button,Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../redux/actions/authActions';
import "../index.css"
import { useNavigate, Link } from 'react-router-dom';
const AppNavbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <>
    <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
      <Navbar.Brand as={Link} to="/" className="me-auto px-2">Fitness Track</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto px-2">
        {/* <DarkModeToggle /> */}
          {userInfo && (
            <>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
             
             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              
              {/* <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>  */}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Logout</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to log out?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
};

export default AppNavbar;
