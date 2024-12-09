import axios from "axios";

function destroyToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiredOn");
    localStorage.removeItem("otpExpireTime");
}

export const refresh = (error) => {
    return new Promise((resolve) => {
        error.response.config.headers["token"] = localStorage.getItem("token");
        axios(error.response.config).then(function (res) {
            return resolve(res);
        }).catch((error) => {
            destroyToken();
            window.location.replace("/");
        });
    });
};