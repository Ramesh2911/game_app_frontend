import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        //Check if the token is still valid here...
        const checkTokenValidity = () => {
            const t = localStorage.getItem("tokenExpiredOn").split(/[- :]/);
            const dt1 = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
            const dt2 = new Date();

            var diff = (dt1.getTime() - dt2.getTime()) / 1000;
            diff /= 60;
            var td = Math.round(diff);
            if (td < 0) {
                return false;
            }
            else {
                return true;
            }
        };
        const isTokenValid = checkTokenValidity();

        if (!isTokenValid) {
            localStorage.removeItem("token");
            navigate("/");
        }

    }, [navigate]);

    return {
        isAuthenticated: !!localStorage.getItem("token"),
    };
}

export default useAuth;