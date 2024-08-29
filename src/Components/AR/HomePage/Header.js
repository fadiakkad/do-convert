import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const navMenuStyle = {
  direction: "rtl",
};


function Header() {
  const [expanded, setExpanded] = useState(false);
  const handleNavToggle = () => {
    setExpanded(!expanded);
  };


  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">تحويل</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleNavToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
            <Nav className="ms-auto" style={navMenuStyle}>
              <Nav.Link href="/">القائمة الرئيسية</Nav.Link>       
              <Nav.Link href="/ar/about/">حول</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
