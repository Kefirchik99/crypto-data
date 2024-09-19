import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CoinChart from './CoinChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';



function ExpandButton() {
    const [lgShow, setLgShow] = useState(false);

    return (
        <>
            <Button onClick={() => setLgShow(true)}><FontAwesomeIcon icon={faExpand} /></Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <CoinChart />

                </Modal.Body>
            </Modal>
        </>
    );
}


export default ExpandButton;