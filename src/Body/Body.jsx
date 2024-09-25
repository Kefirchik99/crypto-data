import CoinPage from "./CoinPage/CoinPage";
import GlobalData from "./GlobalData";
import ListCoins from './ListCoins';


function Body({ selectedCurrency }) {
    return (
        <>
            <GlobalData />
            <CoinPage selectedCurrency={selectedCurrency} />
            <ListCoins selectedCurrency={selectedCurrency} />
        </>
    );
}

export default Body;