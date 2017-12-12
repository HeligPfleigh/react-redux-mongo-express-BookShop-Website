"use strict"
import React from 'react';
import { Badge, Navbar, Nav, NavItem, Tooltip, OverlayTrigger } from 'react-bootstrap';

class Menu extends React.Component{
    
    render(){
        const tooltip = (
            <Tooltip id="tooltip">React Header</Tooltip>
        );
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        {/* <OverlayTrigger placement="right" overlay={tooltip}> */}
                        <a href="/">React-Bootstrap</a>
                        {/* </OverlayTrigger> */}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/about">About</NavItem>
                        <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/admin">Admin</NavItem>
                        <NavItem eventKey={2} href="/cart">Your Cart
                            {
                                (this.props.cartItemsNumber > 0) ?
                                <Badge className="badge">{this.props.cartItemsNumber}</Badge> : ('')
                            }
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu;