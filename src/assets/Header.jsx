import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { useAuth } from '../context/auth';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCart } from '../context/cart';
import Searchinput from './Searchinput';

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  function handleLogout() {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/">Online Shopping</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Searchinput />

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>

            {!auth.user ? (
              <>
                <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                <NavLink to="/signin" className="nav-link">Sign In</NavLink>
              </>
            ) : (
              <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                <NavLink
                  to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                  className="dropdown-item"
                >
                  Dashboard
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/signin" onClick={handleLogout}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <NavLink to="/cartitems" className="nav-link d-flex align-items-center">
              <FaCartShopping /> <sup>{cart.length}</sup>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
