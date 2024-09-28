import GlobalData from "./GlobalData";
import CoinPage from "./CoinPage";
import ListCoins from './ListCoins';
import { Route, Routes } from "react-router-dom";
import SearchResult from "./SearchResult";
import Converter from "./CoinPage/Converter";


function Body(props) {
    return (
        <>
            <GlobalData />
            <Converter />
            <Routes>
                <Route path="/" element={<ListCoins {...props} />} />
                <Route path="/coin:coinID" element={<CoinPage {...props} />} />
                <Route path="/search/:q" element={<SearchResult />} />
            </Routes>
        </>
    );
};

export default Body;