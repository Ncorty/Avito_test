import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

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
    charecteristics: {
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
    }
}
