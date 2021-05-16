const extractFromFragment = (fragment) => fragment.match(/#access_token=(.+?)&/)?.[1];

const extractFromCookie = () => document.cookie.match(/accessToken=(.+?)(;|$)/)?.[1];

const convertToBase64 = (base64urlString) => base64urlString.replaceAll("_", "/").replaceAll("-", "+");

const isAuthenticated = () => {
    const accessToken = extractFromCookie();
    if (!accessToken) return false;

    const base64Payload = convertToBase64(accessToken.split(".")[1]);
    const payload = JSON.parse(window.atob(base64Payload));
    const expirationTime = payload.exp * 1000;
    if (expirationTime < Date.now()) return false;
    
    return true;
};

export {
    extractFromFragment,
    extractFromCookie,
    isAuthenticated,
};