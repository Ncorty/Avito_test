import {useNavigate, useParams, useSearch} from "@tanstack/react-router";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "../components/ui/table";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction} from "../components/ui/alert-dialog";
import { Checkbox } from "../components/ui/checkbox";
import { useState } from "react";
import { Input } from "../components/ui/input";

export const adPage = () => {
    const { id } = useParams({strict: false });
    const [reason, setReason] = useState<string>("");
    const [anotherReason, setAnotherReason] = useState<string>("");
    const navigate = useNavigate();
    const {data: ad, isLoading, error} = useQuery({
        queryKey: ['ad', id],
        queryFn: () => api.getAds(Number(id)),
    })
    const approveHandler = async () => {
        await  api.approveAd(Number(id));
        navigate({to: "/list"});
    }
    const rejectHandler = async () => {
        await  api.rejectAd(Number(id), reason, anotherReason);
        navigate({to: "/list"});
    }
    const requestChangesHandler = async () => {
        await  api.requestAd(Number(id), reason, anotherReason)
        navigate({to: "/list"});
    }
    return ( 
        <div>
            {!isLoading && !error && ad && (
            <div className="grid grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow max-w-5xl mx-auto w-full">            
                <div className="col-span-1 mb-4">{/*Тут карусель для фоток*/}
                    <div className="w-full max-w-lg mx-auto h-[340px] flex items-center justify-center bg-white rounded-xl shadow-lg">
                        <Carousel className="w-full h-full">
                            <CarouselContent>
                                {Array.from({ length: ad.images.length }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="flex items-center justify-center w-full h-[300px]">
                                            <img src={ad.images[index]} alt={`Image ${index + 1}`} className="max-h-[280px] max-w-full object-contain rounded-lg shadow" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
                <div className="col-span-1 mb-4 p-6 bg-gray-50 rounded-lg shadow-sm w-full">{/*Тут описание товара*/}
                    <span className="text-lg font-semibold">Описание:</span>
                    <div className="mt-2 text-gray-700">{ad.description}</div>
                </div>
                <div className="col-span-2 mb-4 p-6 bg-gray-50 rounded-lg shadow-sm w-full">{/*Тут характеристики товара в виде таблицы */}
                    <span className="text-lg font-semibold">Характеристики:</span>
                    <Table className="mt-2 w-full">
                        <TableBody>
                            {Object.entries(ad.characteristics).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell className="font-medium text-gray-600 w-1/3">{key}</TableCell>
                                    <TableCell className="text-gray-800 w-2/3">{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="col-span-2 mb-4 p-6 bg-gray-50 rounded-lg shadow-sm w-full">{/*Тут описание продавца */}
                    <span className="text-lg font-semibold">Продавец:</span>
                    <div className="mt-2 text-gray-700">
                        {ad.seller.name} | Рейтинг: {ad.seller.rating} | Всего объявлений: {ad.seller.totalAds} 
                        | Зарегистрирован: {new Date(ad.seller.registeredAt).toLocaleString('ru-RU',{
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        })}
                    </div>
                </div>
                <div className="col-span-2 mb-4 p-6 bg-gray-50 rounded-lg shadow-sm w-full">{/*Тут история модерации */}
                    <span className="text-lg font-semibold">История модерации:</span>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {ad.moderationHistory.map(history => (
                            <div className="flex flex-col text-gray-700 bg-white rounded p-4 shadow-sm" key={history.id}>
                                <span><b>Модератор:</b> {history.moderatorName}</span>
                                <span><b>Действие:</b> {history.action}</span>
                                <span><b>Причина:</b> {history.reason}</span>
                                <span><b>Комментарий:</b> {history.comment}</span>
                                <span><b>Время:</b> {new Date(history.timestamp).toLocaleString('ru-RU')}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 flex flex-row gap-6 mb-6 w-full">{/*Тут будут кнопки для модерации*/}
                    <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={() => approveHandler()}>
                        Одобрить
                    </Button>
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow">
                                    Отклонить
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>Выберите причину и комментарий для отклонения</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-3">
                                            <Checkbox id="reason-1" 
                                            checked={reason === "Запрещенный товар"}
                                            onCheckedChange={() => setReason("Запрещенный товар")}
                                            />
                                            <Label htmlFor="reason-1"> Запрещенный товар </Label>
                                            <Checkbox id="reason-2" 
                                            checked={reason === "Неверная категория"}
                                            onCheckedChange={() => setReason("Неверная категория")}
                                            />
                                            <Label htmlFor="reason-2"> Неверная категория </Label>
                                            <Checkbox id="reason-3" 
                                            checked={reason === "Некоретное описание"}
                                            onCheckedChange={() => setReason("Некоретное описание")}
                                            />
                                            <Label htmlFor="reason-3"> Некоретное описание </Label>
                                            <Checkbox id="reason-4" 
                                            checked={reason === "Проблемы с фото"}
                                            onCheckedChange={() => setReason("Проблемы с фото")}
                                            />
                                            <Label htmlFor="reason-4"> Проблемы с фото </Label>
                                            <Checkbox id="reason-5" 
                                            checked={reason === "Подозрение на мошенничество"}
                                            onCheckedChange={() => setReason("Подозрение на мошенничество")}
                                            />
                                            <Label htmlFor="reason-5"> Подозрение на мошенничество </Label>
                                            <Checkbox id="reason-6" 
                                            checked={reason === "Другое"}
                                            onCheckedChange={() => setReason("Другое")}
                                            />
                                            <Label htmlFor="reason-6"> Другое </Label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="comment">Комментарий</Label>
                                            <Input 
                                                id="comment"
                                                value={anotherReason}
                                                onChange={(e) => setAnotherReason(e.target.value)}
                                                placeholder="Укажите причину или комментарий"
                                                className="min-h-[80px]"
                                            />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={() => rejectHandler()}>
                                        Подтвердить
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow">
                                    На доработку
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>Выберите причину и комментарий для доработки</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-3">
                                            <Checkbox id="reason-1" 
                                            checked={reason === "Запрещенный товар"}
                                            onCheckedChange={() => setReason("Запрещенный товар")}
                                            />
                                            <Label htmlFor="reason-1"> Запрещенный товар </Label>
                                            <Checkbox id="reason-2" 
                                            checked={reason === "Неверная категория"}
                                            onCheckedChange={() => setReason("Неверная категория")}
                                            />
                                            <Label htmlFor="reason-2"> Неверная категория </Label>
                                            <Checkbox id="reason-3" 
                                            checked={reason === "Некоретное описание"}
                                            onCheckedChange={() => setReason("Некоретное описание")}
                                            />
                                            <Label htmlFor="reason-3"> Некоретное описание </Label>
                                            <Checkbox id="reason-4" 
                                            checked={reason === "Проблемы с фото"}
                                            onCheckedChange={() => setReason("Проблемы с фото")}
                                            />
                                            <Label htmlFor="reason-4"> Проблемы с фото </Label>
                                            <Checkbox id="reason-5" 
                                            checked={reason === "Подозрение на мошенничество"}
                                            onCheckedChange={() => setReason("Подозрение на мошенничество")}
                                            />
                                            <Label htmlFor="reason-5"> Подозрение на мошенничество </Label>
                                            <Checkbox id="reason-6" 
                                            checked={reason === "Другое"}
                                            onCheckedChange={() => setReason("Другое")}
                                            />
                                            <Label htmlFor="reason-6"> Другое </Label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="comment">Комментарий</Label>
                                            <Input 
                                                id="comment"
                                                value={anotherReason}
                                                onChange={(e) => setAnotherReason(e.target.value)}
                                                placeholder="Укажите причину или комментарий"
                                                className="min-h-[80px]"
                                            />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={() => requestChangesHandler()}>
                                        Подтвердить
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <div className="col-span-2 flex flex-row gap-6 mt-8 w-full">{/*Тут будут кнопки для навигации */}
                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow" onClick={() => navigate({ to: "/list" })}>
                        Назад к списку
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={()=> navigate({to: "/item/$id", params: {id: String(Number(id) - 1)}})}>
                        Предыдущее объявление
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={()=> navigate({to: "/item/$id", params: {id: String(Number(id) + 1)}})}>
                        Следующее объявление
                    </Button>
                </div>
            </div>
            )} 
        </div>
    );
}