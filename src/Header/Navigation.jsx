import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { currencies } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCurrency } from "../services/store";
import "../styles/Navigation.scss"

function Navigation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedCurrency = useSelector((state) => state.selectedCurrency);

    const handleSubmit = (event) => {
        event.preventDefault();

        const q = event.target.q.value;

        if (!q) return;

        navigate("/search/" + q);
    };


    return (
        <Navbar expand="lg" className="navigation">
            <Container fluid>
                <Navbar.Brand href="#" className="navigation__brand">
                    Navbar scroll
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav navbarScroll className="navigation__nav">
                        <Link to="/" className="navigation__link">
                            Home
                        </Link>
                        <Link to="/exchanges" className="navigation__link">
                            Exchanges
                        </Link>
                        <Link to="/compare" className="navigation__link">
                            Compare
                        </Link>
                        <NavDropdown
                            title="Currency"
                            id="navbarScrollingDropdown"
                            className="navigation__dropdown"
                        >
                            {currencies.map((currency) => (
                                <NavDropdown.Item
                                    active={selectedCurrency.name === currency.name}
                                    key={currency.name}
                                    onClick={() => dispatch(setSelectedCurrency(currency))}
                                    className="navigation__dropdown-item"
                                >
                                    {currency.name} {currency.symbol}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <Form onSubmit={handleSubmit} className="navigation__form">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="q"
                            className="navigation__input"
                        />
                        <Button type="submit" className="navigation__button">
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;