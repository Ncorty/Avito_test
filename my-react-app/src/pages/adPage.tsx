import {useNavigate, useParams, useSearch} from "@tanstack/react-router";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { Card, CardContent } from "../components/ui/card";
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
        await  api.rejectAd(Number(id), reason === "Другое" ? anotherReason : reason, "");
        navigate({to: "/list"});
    }
    const requestChangesHandler = async () => {
        await  api.requestAd(Number(id), reason, "")
        navigate({to: "/list"});
    }
    return ( 
        <div>
            {!isLoading && !error && ad && (
            <div className="flex-col">            
                <div>{/*Тут карусель для фоток*/}
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {Array.from({ length: ad.images.length }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <img src={ad.images[index]} alt={`Image ${index + 1}`} className="max-h-full max-w-full object-contain"/>
                                                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                            </CardContent>
                                        </Card>

                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div>{/*Тут описание товара*/}
                    {ad.description}
                </div>
                <div>{/*Тут характеристики товара в виде таблицы */}
                    <Table>
                        <TableBody>
                            {Object.entries(ad.characteristics).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                                
                </div>
                <div>{/*Тут описание продовца */}
                    <Label>
                        Продавец: {ad.seller.name} | Рейтинг: {ad.seller.rating} | Всего объявлений: {ad.seller.totalAds} 
                        | Зарегистрирован: {new Date(ad.seller.registeredAt).toLocaleString('ru-RU',{
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        // hour: 'numeric',
                        // minute: 'numeric',
                        })}
                    </Label>
                </div>
                <div>{/*Тут история модерации */}
                    <Label>История модерации:</Label>
                    <Label class="flex-col">{ad.moderationHistory.map(history => (
                        <div class="flex"key={history.id}>
                            Модератор: {history.moderatorName} | Действие: {history.action} | Причина: {history.reason} | Комментарий: {history.comment} | Время: {new Date(history.timestamp).toLocaleString('ru-RU')}
                        </div>
                    ))}</Label>
                </div>
                <div class="flex-row">{/*Тут будут кнопки для модерации*/}
                    <div class="flex-row">
                        <Button onClick={() => approveHandler()}>
                            Одобрить
                        </Button>
                    </div>
                    <div class="flex-row">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    Отклонить
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>Выберите причину для отклонения</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div class="flex flex-col gap-6">
                                        <div class="flex items-center gap-3">
                                            <Checkbox id="reason-1" 
                                            checked={reason === "Запрещенный товар"}
                                            onCheckedChange={() => setReason("Запрещенный товар")}
                                            />
                                            <Label htmlFor="reason-1"> Запрещенный товар </Label>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Checkbox id="reason-2" 
                                            checked={reason === "Неверная категория"}
                                            onCheckedChange={() => setReason("Неверная категория")}
                                            />
                                            <Label htmlFor="reason-2"> Неверная категория </Label>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Checkbox id="reason-3" 
                                            checked={reason === "Некоретное описание"}
                                            onCheckedChange={() => setReason("Некоретное описание")}
                                            />
                                            <Label htmlFor="reason-3"> Некоретное описание </Label>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Checkbox id="reason-4" 
                                            checked={reason === "Проблемы с фото"}
                                            onCheckedChange={() => setReason("Проблемы с фото")}
                                            />
                                            <Label htmlFor="reason-4"> Проблемы с фото </Label>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Checkbox id="reason-5" 
                                            checked={reason === "Подозрение на мошенничество"}
                                            onCheckedChange={() => setReason("Подозрение на мошенничество")}
                                            />
                                            <Label htmlFor="reason-5"> Подозрение на мошенничество </Label>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Checkbox id="reason-6" 
                                            checked={reason === "Другое"}
                                            onCheckedChange={() => setReason("Другое")}
                                            />
                                            <Label htmlFor="reason-6"> Другое </Label>
                                            <Input 
                                            value={anotherReason}
                                            onChange={(e) => {!!e ? setAnotherReason(e.target.value) : setAnotherReason(""); setReason("Другое")}}
                                            placeholder="Укажите причину"
                                            autoFocus
                                            />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => rejectHandler()}>Подтвердить</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                    <div class="flex-row">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button>
                                    На доработку
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>Укажите комментарий для доработки</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <Input 
                                        value={anotherReason}
                                        onChange={(e) => {!!e ? setAnotherReason(e.target.value) : setAnotherReason(""); setReason("Другое")}}
                                        placeholder="Укажите причину"
                                        autoFocus
                                        />
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => requestChangesHandler()}>Подтвердить</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        
                    </div>
                </div>
                <div class="flex-row">{/*Тут будут кнопки для навигации */}
                    <div class="flex">
                        <Button className="flex justify-start gap-4 px-10 mr-10" onClick={() => navigate({ to: "/list" })}>
                            Назад к списку
                        </Button>
                        <Button className="flex justify-end gap-4" onClick={()=> navigate({to: "/item/$id", params: {id: Number(id) - 1}})}>
                            Предыдущее объявление
                        </Button>
                        <Button className="flex justify-end gap-4 mx-4" onClick={()=> navigate({to: "/item/$id", params: {id: Number(id) + 1}})}>
                            Следующее объявление
                        </Button>
                    </div>
                </div>
            </div>
            )} 
        </div>
    );
}