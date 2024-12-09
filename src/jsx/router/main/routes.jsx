import { Navigate } from 'react-router-dom';

/// Dashboard
import Home from "../../components/Dashboard/Home";


const AllRoutes = (props) => {

    return [
        {
            url: "dashboard",
            component: <Home {...props} />
        },
        {
            url: "/",
            component: <Navigate to="/dashboard" replace />
        },
    ];
};

export default AllRoutes;