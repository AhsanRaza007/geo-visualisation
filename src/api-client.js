import axios from "axios"


const API_URL = 'https://kyupid-api.vercel.app/api/'

export const getData = async(endpoint) => {
    try {
        const res = await axios.get(API_URL + endpoint);
        return res.data;
    } catch (err) {
        throw err;
    }
}