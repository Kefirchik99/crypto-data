import React from "react";
import { getExchangeList } from "../services/api";

export const BodyContext = React.createContext();

function BodyProvider({ children }) {
    const [historyLog, setHistoryLog] = React.useState([]);
    const [exchangeList, setExchangeList] = React.useState([]);
    const [compareList, setCompareList] = React.useState([]);

    React.useEffect(() => {
        getExchangeList().then(setExchangeList);
    }, []);

    const removeCoin = (id) => {
        setHistoryLog((prevHistory) => prevHistory.filter((log) => log.id !== id));
        setCompareList((prevCompareList) => prevCompareList.filter((coin) => coin.id !== id));
    };

    const context = {
        exchangeList,
        compareList,
        setCompareList,
        historyLog,
        setHistoryLog,
        removeCoin,
    };

    return (
        <BodyContext.Provider value={context}>{children}</BodyContext.Provider>
    );
}

export default BodyProvider;
