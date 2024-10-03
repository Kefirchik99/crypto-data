import GlobalData from "./GlobalData";
import CoinPage from "./CoinPage";
import ListCoins from './ListCoins';
import { Route, Routes } from "react-router-dom";
import SearchResult from "./SearchResult";
import ErrorModal from "./ErrorModal";


function Body(props) {
    return (
        <>
            <GlobalData />
            <Routes>
                <Route path="/" element={<ListCoins {...props} />} />
                <Route path="/coin:coinID" element={<CoinPage {...props} />} />
                <Route path="/search/:q" element={<SearchResult />} />
            </Routes>
            <ErrorModal />
        </>
    );
};

export default Body;