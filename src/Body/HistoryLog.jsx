import React from "react";
import { Link } from "react-router-dom";
import { BodyContext } from "../providers/BodyProvider";

function HistoryLog() {

    const { historyLog, setHistoryLog } = React.useContext(BodyContext);

    const handleRemove = (id) => {
        setHistoryLog((prevHistory) => prevHistory.filter((log) => log.id !== id));
    };

    return (
        <ul>
            {historyLog.map((log) => (
                <li key={log.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/coin/${log.id}`} style={{ marginRight: '10px' }}>
                        {log.name}
                    </Link>
                    <button
                        onClick={() => handleRemove(log.id)}

                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default HistoryLog;
