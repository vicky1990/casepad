import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Outlet, NavLink } from "react-router-dom";

function LoginHeader(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>CasePad</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/signup">
            Register
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default LoginHeader;
