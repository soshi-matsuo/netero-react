const extractFromFragment = (fragment) => fragment.match(/#access_token=(.+?)&/)?.[1];

const extractFromCookie = () => document.cookie.match(/accessToken=(.+?)(;|$)/)?.[1];

// TODO should verify the payload of the access token JWT.
const isAuthenticated = () => extractFromCookie();

export {
    extractFromFragment,
    extractFromCookie,
    isAuthenticated,
};