import React from "react";
import { Link } from "react-router-dom";
import { BodyContext } from "../providers/BodyProvider";
import removeIcon from "../pictures/Remove-Logo.png";
import "../styles/HistoryLog.scss"

function HistoryLog() {
    const { historyLog, setHistoryLog } = React.useContext(BodyContext);

    const handleRemove = (id) => {
        setHistoryLog((prevHistory) => prevHistory.filter((log) => log.id !== id));
    };

    return (
        <div className="history-log-container">
            {historyLog.map((log) => (
                <div key={log.id} className="history-log-item">
                    <Link to={`/coin/${log.id}`} className="coin-name">
                        {log.name}
                    </Link>
                    <img
                        src={removeIcon}
                        alt="Remove"
                        onClick={() => handleRemove(log.id)}
                        className="remove-icon"
                    />
                </div>
            ))}
        </div>
    );
}

export default HistoryLog;