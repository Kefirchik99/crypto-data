import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { currencies } from '../constants';

function Navigation({ selectedCurrency, setSelectedCurrency }) {

    const symbol = Object.entries(currencies).find(
        ([sym, currency]) => currency === selectedCurrency
    )?.[0];

    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-4">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title={`${symbol} - ${selectedCurrency}`} id="navbarScrollingDropdown">
                            {Object.entries(currencies).map(([symbol, currency]) => (
                                <NavDropdown.Item
                                    active={selectedCurrency === currency}
                                    key={currency}
                                    onClick={() => setSelectedCurrency(currency)}
                                >
                                    {symbol} - {currency}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
