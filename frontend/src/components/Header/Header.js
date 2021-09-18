import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../../assets/logo.png';
import logout from '../../assets/logout.png';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";

const Header = (props) => {

    const history = useHistory();
    const [active, setActive] = useState('default');
    let user = props.user;
    if(!props.user) {
        if(localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
        } else {
            history.push('/');
        }
    }
    const onNavClick = (path) => {
        history.push(path);
    }

    const onBrandClick = (user) => {
        if(user) {
            history.push('/Home');
        } else {
            history.push('/');
        }
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        history.push('/');
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="top" className="mb-5">
            <Container>
                <Navbar.Brand href="#" className="align-items-center" onClick={() => onBrandClick(user)}>
                    <img src={logo} alt="logo" style={{width:'12%', height:'12%'}} className="rounded-circle"/>
                    <span className="h4 p-3"><b>Components</b></span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    {
                        props.tiles ? (
                            <Nav className="align-items-center"
                                 activeKey={active}
                                 onSelect={(selectedKey) => setActive(selectedKey)}>
                                {
                                    props.tiles.map(tile => (
                                        <Nav.Link eventKey="link-1" onClick={() => onNavClick(tile.path)} href="#" key={tile.path}> <span className="text-white">{tile.heading}  |</span></Nav.Link>
                                    ))
                                }
                            </Nav>
                        ) : ''
                    }
                    {
                        user ? (
                        <Nav className="align-items-center">
                            <Nav.Link>
                                <span className="text-white h3" style={{fontSize:'0.9rem'}}>({user.name})</span>
                            </Nav.Link>
                            <Nav.Link onClick={onLogout} href="#">
                                <img src={logout} alt={"logout"} className="img-fluid" style={{width:'50%', height:'50%'}}/>
                            </Nav.Link>
                        </Nav>
                        ) :''
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;