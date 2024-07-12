import axios from 'axios';
import CryptoJS from 'crypto-js';

const ts = new Date().getTime();
const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY as string;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY as string;
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    params: {
        ts,
        apikey: publicKey,
        hash,
    },
});

export default api;
