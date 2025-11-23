import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ||'http://localhost:3001';


export interface IadsResponse{
    ads: Iads[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface Iads{
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryID: number;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
    seller:{
        id: null
        name: string;
        rating: string;
        totalAds: number;
        registeredAt: string;
    };
    characteristics: {
        Состояние: string;
        Гарантия: string;
        Производитель: string;
        Модель: string;
        Цвет: string;
    };
    moderationHistory: ImoderationHistory[];
}

export interface ImoderationHistory{
    id: number;
    moderatorID:number;
    moderatorName: string;
    action: string;
    reason: string;
    comment: string;
    timestamp: string;
}

type GetAdsParams = {
  page?: number;
  limit?: number;
  status?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};



export const api = {
    getAllAds: async (params: GetAdsParams)=>{
        const response = await axios.get<IadsResponse>(`${API_URL}/ads`, {params});
        console.log(response.data);
        return response.data;
    },
    getAds: async (id: number)=>{
        const response = await axios.get<Iads>(`${API_URL}/ads/${id}`);
        return response.data;
    },
    approveAd: async (id: number)=>{
        const response = await axios.post(`${API_URL}/ads/${id}/approve`, {});
        return response.data;
    },
    rejectAd: async (id: number, reason: string, comment: string)=>{
        const response = await axios.post(`${API_URL}/ads/${id}/reject`, {reason, comment});
        return response.data;
    },
    requestAd: async (id: number, reason: string, comment: string)=>{
        const response = await axios.post(`${API_URL}/ads/${id}/request-сhanges`, {reason, comment});
        return response.data;
    },
    statsSummaryAd: async(period: string)=>{
        const response = await axios.get(`${API_URL}/stats/summary`, {params: {period}});
        return response.data;
    },
    statsActivityAd: async(period: string)=>{
        const response = await axios.get(`${API_URL}/stats/chart/activity`, {params: {period}});
        return response.data;
    },
    statsDecisionsAd: async(period: string)=>{
        const response = await axios.get(`${API_URL}/stats/chart/decisions`, {params: {period}});
        return response.data;
    },
    statsCategoryAd: async(period: string)=>{
        const response = await axios.get(`${API_URL}/stats/chart/categories`, {params: {period}});
        return response.data;
    }
}
