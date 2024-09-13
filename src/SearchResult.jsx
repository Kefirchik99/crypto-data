import Table from 'react-bootstrap/Table';

function SearchResult() {
    return (
        <>
            <h3>Search result</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        </>
    );
}

export default SearchResult;