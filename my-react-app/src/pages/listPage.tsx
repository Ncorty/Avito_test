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
// import { Iads } from "../api/api";

export const listPage = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [status, setStatus] = React.useState<string | undefined>(undefined);
    const [categoryId, setCategoryId] = React.useState<number | undefined>(undefined);
    const [minPrice, setMinPrice] = React.useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = React.useState<number | undefined>(undefined);
    const [search, setSearch] = React.useState<string | undefined>(undefined);
    const [sortBy, setSortBy] = React.useState<string | undefined>(undefined);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc' | undefined>(undefined);
    const {data: ads, isLoading, error} = useQuery({
        queryKey: ['ads', page, limit, status, categoryId, minPrice, maxPrice, search, sortBy, sortOrder],
        queryFn: () => api.getAllAds({page, limit, status, categoryId, minPrice, maxPrice, search, sortBy, sortOrder}),
    });
    console.log(ads?.length);
    return (
    <div>
        <header>
            {/*надо потом добавить фильтры и сортировку*/}

            Систему управления объявлениями для модерации
            
        </header>
        <></>
        <div>
            {/*надо потом добавить пагинацию и вывод 10 элемнтов*/}

            {!isLoading && !error && ads && ads.ads.length > 0 && (
            <>
            {ads.ads.map((ad) => (
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
                        <div>Статус: {ads.ads[0].status}</div>
                        <div>Приоритет: {ads.ads[0].priority}</div>
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
            ))}
            </>
            )}
        </div>
    </div>
);
}