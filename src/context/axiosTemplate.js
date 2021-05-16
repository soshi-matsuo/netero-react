import axios from "axios";
import {extractFromCookie} from "./accessToken";

const axiosTemplate = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

const get = (url) => axiosTemplate.get(url, {
    headers: { Authorization: `Bearer ${extractFromCookie()}` },
});

const post = (url, data = null) => axiosTemplate.post(url, data, {
  headers: { Authorization: `Bearer ${extractFromCookie()}` },
});

export {
    get,
    post,
};
