import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import React from "react"
import { Button } from "../components/ui/button";
import { api } from "@/api/api";

// interface ads{
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     category: string;
//     categoryID: number;
//     status: string;
//     priority: string;
//     createdAt: string;
//     updatedAt: string;
//     images: string[];
//     seller:{
//         id: null
//         name: string;
//         rating: string;
//         totalAds: number;
//         registeredAt: string;
//     };
//     charecteristics: {
//         Состояние: string;
//         Гарантия: string;
//         Производитель: string;
//         Модель: string;
//         Цвет: string;
//     };
//     moderationHistory: [];
// }

export const listPage = () => {
    //const [status, setStatus] = React.useState([]);
    const [sortBy, setSortBy] = React.useState("date");//date, price, priority
    const [filterBy, setFilterBy] = React.useState("");//status, category, price range, none
    const [ads, setAds] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const id =1 ;
    const {data: ad, isLoading, error} = useQuery<ads>({
        queryKey: ['ad', id],
        queryFn: () => api.getAds(id),
    });
    return (
    <div>
        <header>
            {/*надо потом добавить фильтры и сортировку*/}
        </header>
        <div>
            {/*надо потом добавить пагинацию и вывод 10 элемнтов*/}
            {!isLoading && !error && ad && (
            <Card class="border-2 border-gray-300 rounded-lg mx-4 my-4 px-4 flex">
            <div class = "flex-1">
                <CardHeader>
                    {/*надо потом добавить заполнением данным с бэка*/}
                    <CardTitle class="py-2">{ad.title}</CardTitle> 
                    <CardDescription class="flex flex-row">
                        <div>
                        <div>Категория: {ad.category}</div>
                        <div>Дата создание: {new Date(ad.createdAt).toLocaleString('ru-RU',{
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        })}
                        </div>
                        <div>Статус: {ad.status}</div>
                        <div>Приоритет: {ad.priority}</div>
                        </div>
                        <div class="justify-end ml-auto">
                            <img
                                src={ad.images[0]} 
                                alt={ad.title}
                                class="w-32 h-32 object-cover rounded-lg mx-4"
                            />
                        </div>
                        <div>
                            <img
                                src={ad.images[1]}
                                alt={ad.title}
                                class="w-32 h-32 object-cover rounded-lg"
                            />
                        </div>
                    </CardDescription>
                    <CardFooter class="flex items-center gap-4 py-2">
                        Цена : {ad.price} ₽
                        <div class="ml-auto">
                            <Button>Подробнее</Button>
                        </div>
                    </CardFooter>
                </CardHeader>
            </div>
            </Card>
            )}
        </div>
    </div>
);
}