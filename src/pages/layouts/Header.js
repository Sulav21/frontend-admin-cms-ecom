import React from "react";
import { Navbar, Container, Nav,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import { AdminSideBar } from "../../components/adminSideBar/AdminSideBar";
import { toggleSidebar } from "../../components/system-state/systemSlice";
import { useDispatch } from "react-redux";
export const Header = () => {
  const dispatch = useDispatch()
  return (
    <Navbar bg="primary" expand="md">
      <Container>
      <Button variant="primary" onClick={()=>dispatch(toggleSidebar())}>
      <i class="fa-solid fa-bars"></i>
      </Button>
        <LinkContainer to="/">
          <Navbar.Brand>Cricket Store</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
