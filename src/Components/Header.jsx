import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'

const Header = ({authState, oktaAuth}) => {

    
    if (authState?.isPending) {
        return <div>Loading...</div>;
    }

    const button = authState?.isAuthenticated ?
        <Button variant="secondary" onClick={() => {  oktaAuth.signOut('/'); }}>Logout</Button> :
        <Button variant="secondary" onClick={() => {  oktaAuth.signInWithRedirect() }}>Login</Button>

    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Products with FaunaDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    {button}
                </Form>
            </Navbar.Collapse>
        </Navbar>

    );
};
export default Header;