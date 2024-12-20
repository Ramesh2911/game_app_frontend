const { VITE_API_DOMAIN, REACT_APP_API_WEB_DOMAIN } = import.meta.env;

export const API_DOMAIN = VITE_API_DOMAIN + "api/";
// export const API_WEB_DOMAIN = REACT_APP_API_WEB_DOMAIN;

export const API_ADMIN_REGISTER = API_DOMAIN + "admin-register";
export const API_ADMIN_AUTHENTICATE = API_DOMAIN + "admin-authenticate";

//Game
export const API_CREATE_GAME = API_DOMAIN + "create-game";
export const API_GAME_LIST = API_DOMAIN + "game-list";
export const API_GAME_TYPE_LIST = API_DOMAIN + "game-type-list";
export const API_GAME_TYPE_NAME = API_DOMAIN + "game-type-name";

//Slot
export const API_CREATE_SLOT = API_DOMAIN + "create-slot";
export const API_SLOT_INFO = API_DOMAIN + "slot-info";

//Wallet
export const API_USER_WALLET_INFO = API_DOMAIN + "user-wallet-info";
export const API_WALLET_STATUS_UPDATE = API_DOMAIN + "wallet-status-update";
export const API_USER_WITHDRAWAL_INFO = API_DOMAIN + "user-withdrawal-info";

//Result
export const API_SLOT_LIST = API_DOMAIN + "slot-list";
export const API_RESULT_CREATE = API_DOMAIN + "result-create";
export const API_RESULT_LIST = API_DOMAIN + "result-list";
