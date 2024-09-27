import GlobalData from "./GlobalData";
import ListCoins from './ListCoins';



function Body(props) {
    return (
        <>
            <GlobalData />
            <ListCoins {...props} />
        </>
    );
}

export default Body;