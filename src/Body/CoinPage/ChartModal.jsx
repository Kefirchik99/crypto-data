
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ChartModal({ show, handleClose, children }) {

    return (

        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Bitcoin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ChartModal;