import React from "react";
import { Link } from "react-router-dom";
import { BodyContext } from "../providers/BodyProvider";

function HistoryLog() {

    const { historyLog } = React.useContext(BodyContext);

    return (
        <ul>
            {historyLog.map((log) => (
                <li key={log.id}>
                    <Link to={`/coin/${log.id}`}>
                        {log.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default HistoryLog;
