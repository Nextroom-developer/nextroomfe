import Cookies from "js-cookie";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const SHOP_NAME = "shopName";
const ADMIN_CODE = "adminCode";
const STATUS = "status";
const THEME_ID = "themeId";
const ACCESS_TOKEN_EXPIRES_IN = "accessTokenExpiresIn";
interface LoginInfo {
  accessToken: string;
  shopName: string;
  adminCode: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
}

export const setLocalStorage = (key: string, value: string | number) => {
  if (typeof window === "undefined") return;

  const storage = window.localStorage;
  if (!storage) return;

  switch (typeof value) {
    case `string`: {
      try {
        storage.setItem(key, value);
      } catch (e) {
        console.error(`failed to stringify`);
      }
      break;
    }
    default:
      storage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string, defaultValue = null) => {
  if (typeof window !== "undefined") {
    const storage = window.localStorage;
    if (!storage) {
      return null;
    }
    return storage.getItem(key) ?? defaultValue;
  }
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    const storage = window.localStorage;
    if (!storage) {
      return;
    }
    storage.removeItem(key);
  }
};

export const setLoginInfo = (loginInfo: LoginInfo) => {
  const {
    accessToken,
    refreshToken,
    shopName,
    adminCode,
    accessTokenExpiresIn,
  } = loginInfo;

  setLocalStorage(ACCESS_TOKEN, accessToken);
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    secure: true,
    sameSite: "Strict",
    expires: 7,
  });
  setLocalStorage(SHOP_NAME, shopName);
  setLocalStorage(ADMIN_CODE, adminCode);
  setLocalStorage(ACCESS_TOKEN_EXPIRES_IN, accessTokenExpiresIn);
};

export const setStatus = (status: string) => {
  setLocalStorage(STATUS, status);
};

export const setSelectedThemeId = (themeId: number) => {
  setLocalStorage(THEME_ID, themeId);
};

export const getLoginInfo = (): LoginInfo => {
  return {
    accessToken: getLocalStorage(ACCESS_TOKEN) || "",
    refreshToken: Cookies.get(REFRESH_TOKEN) || "",
    shopName: getLocalStorage(SHOP_NAME) || "",
    adminCode: getLocalStorage(ADMIN_CODE) || "",
    accessTokenExpiresIn: getLocalStorage(ACCESS_TOKEN_EXPIRES_IN) || "",
  };
};
export const getStatus = () => getLocalStorage(STATUS);
export const getSelectedThemeId = () => getLocalStorage(THEME_ID);

export const removeAccessToken = () => {
  removeLocalStorageItem(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};

export const removeThemeId = () => {
  removeLocalStorageItem(THEME_ID);
};

export const removeLocalStorageAll = () => {
  if (typeof window !== "undefined") {
    setLoginInfo({
      accessToken: "",
      refreshToken: "",
      shopName: "",
      adminCode: "",
      accessTokenExpiresIn: "",
    });
    Cookies.remove(REFRESH_TOKEN);
  }
};
