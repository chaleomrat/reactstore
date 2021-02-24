import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 
} from 'reactstrap';

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
 light expand="md">
        <NavbarBrand href="/">SE Store</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Product List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/add">Add New Product</NavLink>
            </NavItem>
               <NavItem>
              {/* <NavLink href="/edit">Edit Product</NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;