import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavigationBar.css"

function NavigationBar(props) {
    return (
        <div className="Navbar container">
            <Navbar className="color-nav" fluid collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">TrevBuc</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer to="/register">
                            <NavItem>Register</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <NavItem>Login</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/reviews">
                            <NavItem>Reviews</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;