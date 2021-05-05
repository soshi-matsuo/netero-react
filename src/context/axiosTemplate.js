import axios from "axios";
import {extractFromCookie} from "./accessToken";

export default axios.create({
    headers: {
        Authorization: `Bearer ${extractFromCookie()}`
    },
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
