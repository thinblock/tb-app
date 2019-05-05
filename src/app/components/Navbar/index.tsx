import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import { Navbar, Nav, Button } from 'react-bootstrap';

const style = require('./style.scss');

interface INavProps {
  email: string;
  logoutAction?(): any;
}

export const PageNav: React.SFC<INavProps> = CSSModules((props: INavProps) => (
  <nav styleName="Nav">
    <Navbar collapseOnSelect={true} expand="sm" bg="light" variant="light">
      <Navbar.Brand href="#home">ThinBlock</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Item style={{ color: '#04A2E2' }}>MONITO</Nav.Item>
        </Nav>
        <Nav>
          <Nav.Link>{props.email}</Nav.Link>
          <Button variant="outline-primary" onClick={() => props.logoutAction()}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </nav>
), style);
