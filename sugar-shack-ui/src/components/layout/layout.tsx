import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout-content">
      {/* Application Navbar */}
      <Navbar bg="primary" variant="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">Maple Syrup Shack</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav>
              <Button variant="primary" href="/cart">
                View Cart
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routing Outlet */}
      <Outlet />
    </div>
  );
}

export default Layout;
