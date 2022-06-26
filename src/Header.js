import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Outlet, NavLink } from "react-router-dom";
import useAuth from "./components/useAuth";

function Header(props) {
  const { user } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>CasePad</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Home">
              View
            </Nav.Link>

            <Nav.Link as={NavLink} to="/NewPatient">
              New Patient
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AddVisit">
              Add Visit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <NavDropdown title={user} id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/Login">
              LogOut
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
