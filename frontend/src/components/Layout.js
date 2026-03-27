import React from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from './Navbar'; // Assuming you have Navbar setup

const Layout = ({ children }) => {
  return (
    <>
      <AppNavbar />
      <Container className="mt-5">
        {children}
      </Container>
    </>
  );
};

export default Layout;
