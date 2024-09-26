import GlobalData from "./GlobalData";
import ListCoins from './ListCoins';
import CoinPage from "./CoinPage";


function Body(props) {
    return (
        <>
            <GlobalData />
            <CoinPage />
            <ListCoins {...props} />


        </>
    );
}

export default Body;