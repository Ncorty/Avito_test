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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "../components/ui/input";
import {useNavigate} from "@tanstack/react-router";
import { NativeSelect, NativeSelectOption } from "../components/ui/native-select";




export const listPage = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [status, setStatus] = React.useState<string[]>([]);
    const [category, setCategory] = React.useState<string>("");
    const [categoryId, setCategoryId] = React.useState<number | undefined>(undefined);
    const [minPrice, setMinPrice] = React.useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = React.useState<number | undefined>(undefined);
    const [search, setSearch] = React.useState<string | undefined>(undefined);
    const [sortBy, setSortBy] = React.useState<string | undefined>(undefined);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc' | undefined>(undefined);
    const [open, setOpen] = React.useState(false);
    const {data: ads, isLoading, error} = useQuery({
        queryKey: ['ads', page, limit, status, categoryId, minPrice, maxPrice, search, sortBy, sortOrder],
        queryFn: () => api.getAllAds({page, limit, status, categoryId, minPrice, maxPrice, search, sortBy, sortOrder}),
    });
    const navigate = useNavigate();
    const handleResetFilters = () => {
        setCategoryId(undefined);
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setSearch(undefined);
        setStatus([]);
    }
    return (
    <div>
        <div className="flex-1 py-2">
            <Card class="py-3 mb-4 border-4 mx-4 rounded-lg flex-1 flex-row ">
                <div>
                    <CardHeader class="text-xl font-bold px-4 pb-3">
                        <Label className="text-xl font-bold px-4 pb-3">Система управления объявлениями для модерации</Label>
                    </CardHeader>
                </div>
                <div className="flex flex-row p-4 m-4 gap-4">
                    <CardContent className="flex flex-col flex w-1/4 p-4 bg-white rounded-lg shadow">{/*Выбор состояния*/}
                        <div class="px-4">
                            <div className="font-bold text-lg mb-3">
                                Фильтры по статусу:
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                    id="terms"
                                    className="mr-2 border-2 border-gray-300 rounded w-5 h-5"
                                    checked={status.includes("pending")}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setStatus([...status, "pending"]);
                                        } else {
                                            setStatus(status.filter((s) => s !== "pending"));
                                        }
                                    }}
                                    />
                                    <Label htmlFor="terms">На модерации</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="terms-2"
                                    className="mr-2 border-2 border-gray-300 rounded w-5 h-5"
                                    checked={status.includes("approved")}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setStatus([...status, "approved"]);
                                        } else {
                                            setStatus(status.filter((s) => s !== "approved"));
                                        }
                                    }}
                                    />
                                    <Label htmlFor="terms-2">Одобрено</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="terms-3"
                                    className="mr-2 border-2 border-gray-300 rounded w-5 h-5"
                                    checked={status.includes("rejected")}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setStatus([...status, "rejected"]);
                                        } else {
                                            setStatus(status.filter((s) => s !== "rejected"));
                                        }
                                    }}
                                    />
                                    <Label htmlFor="terms-3">Отклонено</Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent class="flex-col w-1/4 p-4 bg-white rounded-lg shadow">{/*Выбор категории*/}
                    <div className="text-lg font-bold mb-2">Категории: </div>
                        <div className="text-sm text-gray-500 mb-4">
                            1 - Электроника, 2 - Недвижимость, 3 - Транспорт, 4 - Работа, 5 - Услуги, 6 - Животные, 7 - Мода, 8 - Детское.
                        </div>      
                        <Input
                            value={categoryId ? String(categoryId + 1) : categoryId == 0 ? String(categoryId + 1) : ""}
                            onChange={(e) => !!e && e.target.value >= "0" ? setCategoryId(Number(e.target.value)- 1) : setCategoryId(undefined)}
                            placeholder="Введите номер категории"
                            autoFocus
                            className="text-base"
                        />
                    </CardContent>
                    <CardContent class="flex flex-col w-1/4 p-4 bg-white rounded-lg shadow">{/*Выбор цены*/}
                        <div className="flex text-lg font-bold mb-2">
                            Цена:
                        </div> 
                        <div className="flex flex-row gap-2">
                            <Input
                                value={minPrice}
                                onChange={(e) => !!e ? setMinPrice(Number(e.target.value)) : setMinPrice(undefined)}
                                placeholder="Мин"
                                autoFocus
                                className="text-base mb-2"
                            />
                            <Input
                                value={maxPrice}
                                onChange={(e) => !!e ? setMaxPrice(Number(e.target.value)) : setMaxPrice(undefined)}
                                placeholder="Макс"
                                autoFocus
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                    <CardContent className="flex flex-col w-1/4 p-4 bg-white rounded-lg shadow">{/*Поиск*/}
                        <div className="text-lg font-bold mb-2">Поиск</div>
                        <Input
                            value={search}
                            onChange={(e) => !!e ? setSearch(e.target.value) : setSearch(undefined)}
                            placeholder="Введите текст для поиска"
                            autoFocus
                            className="text-base px-4 py-3 mb-4"
                        />
                        <Button className="mt-2" variant="outline" onClick={() => handleResetFilters()}>
                            Сбросить фильтры
                        </Button>
                    </CardContent>
                
                </div>
            </Card>
        </div>
        <div>
            <div>
                <Card className="border-2 border-gray-300 rounded-lg mx-4 px-5 flex">
                    <NativeSelect
                    onChange={(event) => {
                        const value = event.target.value.split(":");
                        setSortBy(!!value[0] ? value[0] : undefined);
                        setSortOrder(!!value[1] ? value[1] as 'asc' | 'desc' : undefined);
                    }}
                    >
                        <NativeSelectOption value={[":"]}>Сортировка по... </NativeSelectOption>
                        <NativeSelectOption value={"createdAt:asc"}>По дате во возрастанию</NativeSelectOption>
                        <NativeSelectOption value={"createdAt:desc"}>По дате по убывании</NativeSelectOption>
                        <NativeSelectOption value={"price:desc"}> Дороже </NativeSelectOption>
                        <NativeSelectOption value={"price:asc"}> Дешевле </NativeSelectOption>
                        <NativeSelectOption value={"priority:desc"}> По приоритету </NativeSelectOption>
                    </NativeSelect>
                </Card>
            </div>
            {!isLoading && !error && ads && ads.ads.length > 0 && (
            <>
            <div className="grid grid-cols-2 gap-4">
            {ads.ads.map(ad => (
            <Card class="border-2 border-gray-300 rounded-lg mx-4 my-4 px-4 flex">
            <div class= "flex-1">
                <CardHeader>
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
                        <div class="">
                            <Button onClick={() => navigate({ to: "/item/$id", params: { id: ad.id } })}>
                                Подробнее
                            </Button>
                        </div>
                    </CardFooter>
                </CardHeader>
            </div>
            </Card>
            ))}
            </div>
            <div>
                <Pagination class="py-3 flex justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setPage(ads.pagination.currentPage == 1 ? ads.pagination.currentPage : ads.pagination.currentPage - 1)} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(1)}>{1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(ads.pagination.currentPage)}>{ads.pagination.currentPage}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(ads.pagination.currentPage <= ads.pagination.totalPages - 1 ? ads.pagination.currentPage + 1 : ads.pagination.totalPages)}>{ads.pagination.currentPage <= ads.pagination.totalPages - 1 ? ads.pagination.currentPage + 1 :""}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(ads.pagination.currentPage <= ads.pagination.totalPages - 2 ? ads.pagination.currentPage + 2 : ads.pagination.totalPages)}>{ads.pagination.currentPage <= ads.pagination.totalPages - 2 ? ads.pagination.currentPage + 2 :""}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(ads.pagination.currentPage <= ads.pagination.totalPages - 3 ? ads.pagination.currentPage + 3 : ads.pagination.totalPages)}>{ads.pagination.currentPage <= ads.pagination.totalPages - 3 ? ads.pagination.currentPage + 3 : ""}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(ads.pagination.totalPages)}>{ads.pagination.totalPages}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={() => setPage(ads.pagination.currentPage == ads.pagination.totalPages ? ads.pagination.currentPage : ads.pagination.currentPage + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            </>
            )}
        </div>
    </div>
);
}