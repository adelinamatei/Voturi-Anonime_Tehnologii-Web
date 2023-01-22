import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import './NavbarMenu.css';

export default function NavbarMenu({ useAuthHandler })
{
  const [isCollapsed, toggleCollapse] = useState(true);
  const toggle = () => toggleCollapse(!isCollapsed);
  const authHandler = useAuthHandler();

  const logout = () => authHandler.logout();

  return (
    <Navbar  style={{ backgroundColor: '#33FFA5' }}
    expand="md">
      <NavbarBrand href="/" className="mr-auto">Note Anonime</NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      { authHandler.isAuthenticated()
      ? (<Collapse isOpen={!isCollapsed} navbar>
          <Nav navbar className="mr-auto">
            <NavItem className="mx-2">
              <Link to="/" className="text-dark nav-link">Acasa</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="mx-2">
              <DropdownToggle nav caret className="text-dark">Notare</DropdownToggle>
              <DropdownMenu right className="bg-secondary">
                <DropdownItem tag={Link} to="/students" className="text-dark dropdown-item-text-color">Studenti</DropdownItem>
                <DropdownItem tag={Link} to="/teams" className="text-dark dropdown-item-text-color">Echipe</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/grade" className="text-dark dropdown-item-text-color">Note</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="mx-2">
              <Link to="/professors" className="text-dark nav-link">Profesori</Link>
            </NavItem>
          </Nav>
          <UncontrolledDropdown inNavbar className="mr-2">
            <DropdownToggle nav caret className="text-dark">Bun venit, {authHandler.getUsername()}!</DropdownToggle>
            <DropdownMenu right className="bg-secondary">
              <DropdownItem tag={Link} to={`/user/${authHandler.getUsername()}`} className="text-dark dropdown-item-text-color">Profil</DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="text-dark dropdown-item-text-color" onClick={logout}>Deconectare</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>)
        : (<Collapse isOpen={!isCollapsed} navbar>
          <Nav navbar className="mr-auto">
            <NavItem className="mx-2">
              <Link to="/sign-up" className="text-dark">Creare Cont</Link>
            </NavItem>
            <NavItem className="mx-2 px-2 border border-white rounded">
              <Link to="/login" className="text-dark">Autentificare</Link>
            </NavItem>
          </Nav>
        </Collapse>)}
    </Navbar>
  );
}
