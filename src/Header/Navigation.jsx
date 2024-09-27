import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { currencies } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ selectedCurrency, setSelectedCurrency }) {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const q = event.target.q.value;

        if (!q) return;

        navigate("/search/" + q);
    };


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
                        <Link to="/" className='nav-link'>Home</Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Currencies" id="navbarScrollingDropdown">
                            {currencies.map(currency => (
                                <NavDropdown.Item active={selectedCurrency.name === currency.name}
                                    key={currency.name}
                                    onClick={() => setSelectedCurrency(currency)}
                                >
                                    {currency.name} {currency.symbol}
                                </NavDropdown.Item>))}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="q"
                        />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navigation;