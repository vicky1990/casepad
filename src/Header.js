import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "./components/useAuth";

function Header(props) {
  const navigate = useNavigate();
  const { logout, authed, user } = useAuth();

  function handleLogOut(event) {
    logout()
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("Logout error");
      });
  }

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
            {/*
            <Nav.Link as={NavLink} to="/AddVisit">
              Add Visit
            </Nav.Link>*/}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <NavDropdown title={user.full_name} id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={(e) => {
                e.preventDefault();
                handleLogOut(e);
              }}
            >
              LogOut
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
