import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export const api = {
    getAllAds: ()=>{
        axios.get(`${API_URL}/ads`);
    },
    getAds: async (id: number)=>{
        const response = await axios.get(`${API_URL}/ads/${id}`);
        return response.data;
    }
}
