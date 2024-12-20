import { Navigate } from 'react-router-dom';

/// Dashboard
import Home from "../../components/Dashboard/Home";

//Game
import ListGame from '../../components/Game/ListGame';
import AddGame from '../../components/Game/AddGame';
import AddSlot from '../../components/Game/AddSlot';

//Wallet
import ListWallet from '../../components/Wallet/ListWallet';
import ListWithdrawal from '../../components/Wallet/ListWithdrawal';
import Result from '../../components/Result/Result';
import ResultList from '../../components/Result/ResultList';


const AllRoutes = (props) => {

    return [
        {
            url: "dashboard",
            component: <Home {...props} />
        },
        {
            url: "create-game",
            component: <AddGame {...props} />
        },
        {
            url: "list-game",
            component: <ListGame {...props} />
        },
        {
            url: "create-slot",
            component: <AddSlot {...props} />
        },
        {
            url: "list-wallet",
            component: <ListWallet {...props} />
        },
        {
            url: "list-withdrawal",
            component: <ListWithdrawal {...props} />
        },
        {
            url: "create-result",
            component: <Result {...props} />
        },
        {
            url: "list-result",
            component: <ResultList {...props} />
        },
        {
            url: "/",
            component: <Navigate to="/dashboard" replace />
        },
    ];
};

export default AllRoutes;