import React from "react";
import { BodyContext } from "../providers/BodyProvider";
import Table from "react-bootstrap/Table"
import Alert from "react-bootstrap/Alert";
import { compareTableData } from "./constants";
import { useSelector } from "react-redux";
import lodash from 'lodash';
import "../styles/ComparePage.scss"

function ComparePage() {
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const { compareList } = React.useContext(BodyContext);

    const tableData = React.useMemo(() => {
        if (!compareList.length) return null;

        const labelData = compareTableData(selectedCurrency.name);
        return labelData.map(({ label, path }) =>
            [label,
                ...compareList.map(coin =>
                    lodash.get(coin, path))])

    }, [compareList]);

    if (!compareList.length) return <Alert>No coins to compare</Alert>;

    return <Table className="compare-table">
        <tbody>
            {tableData.map((data, i) => (
                <tr key={i}>
                    {data.map((d) => (
                        <td key={d}>{d}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </Table>;
}

export default ComparePage; 