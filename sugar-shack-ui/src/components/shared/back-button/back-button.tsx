import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import './back-button.scss';
function BackButton() {
  return (
    <Nav activeKey="/">
      <Nav.Item>
        <Nav.Link href="/" className="nav-back-btn" color="primary">
          Back
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default BackButton;
