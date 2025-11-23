import { useState } from "react";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { Card, CardAction, CardHeader } from "../components/ui/card";
import { Car } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


export const statsPage = () => {
    const [date, setDate] = useState("");//today,week,month
    const {data: stats, isLoading, error} = useQuery({
        queryKey: ['stats', date],
        queryFn: () => api.statsSummaryAd(date),
    })
    const {data: dataActivity, isLoading: loadingActivity, error: errorActivity} = useQuery({
        queryKey: [date, 'activity'],
        queryFn: () => api.statsActivityAd(date),
    })
    const {data: dataDecisions, isLoading: loadingDecisions, error: errorDecisions} = useQuery({
        queryKey: [date, 'decisions'],
        queryFn: () => api.statsDecisionsAd(date),
    })
    const {data: dataCategory, isLoading: loadingCategory, error: errorCategory} = useQuery({
        queryKey: [date, 'category'],
        queryFn: ()=> api.statsCategoryAd(date),
    })
    const arDataDecisions = [
        { name: 'Одобрены', value: dataDecisions?.approved || 0},
        { name: 'Отклонены', value: dataDecisions?.rejected || 0},
        { name: 'Отправлены на доработку', value: dataDecisions?.requestChanges || 0},
    ]
    const arDataCategory = Object.entries(dataCategory ?? {}).map(([category, value]) => ({
        category,
        value,
    }));
    const ms = stats?.averageReviewTime || 0;
    const totalSeconds = Math.floor(ms / 1000);
    const sec = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor(totalSeconds / 3600);
    console.log(arDataDecisions)
    console.log(dataDecisions);
    return ( 
        <div>
            {!isLoading && !error && stats && (
                <div>
                    <div className="flex-1">{/*Здесь будут кнопки для выбора периода*/}
                        <Button onClick={() => setDate("today")}> Сегодня</Button>
                        <Button onClick={() => setDate("week")}> Последняя неделя</Button>
                        <Button onClick={() => setDate("month")}> Последний месяц</Button>
                    </div>
                    <div>{/*Здесь будет отображение статистики*/}
                        <Card className="flex">
                            <CardHeader>
                                Статистика за {date === "today" ? "сегодня" : date === "week" ? "последнюю неделю" : "последний месяц"}
                            </CardHeader>
                            <CardAction className="flex">
                                <Card className="flex-1 w-100 m-4 p-4 ">
                                    <CardHeader className="flex items-center text-xl font-bold">
                                        Всего объявлений проверено
                                    </CardHeader>
                                    <CardAction className="flex items-center">
                                        {stats.totalReviewed}
                                    </CardAction>
                                </Card>
                                <Card className="flex-1 w-100 m-4 p-4 ">
                                    <CardHeader className="flex items-center text-xl font-bold">
                                        Среднее Время
                                    </CardHeader>
                                    <CardAction className="flex items-center">
                                        {!!hours && `${hours} ч`} {!!minutes && `${minutes} мин`} {sec} с
                                    </CardAction>
                                </Card>
                            </CardAction>
                            <CardAction className="flex">
                                <Card className="flex-1 w-100 m-4 p-4 ">
                                    <CardHeader className="flex items-center text-xl font-bold">
                                        Одобренные объявления
                                    </CardHeader>
                                    <CardAction className="flex items-center">
                                        {Math.round(stats.approvedPercentage)}%
                                    </CardAction>
                                </Card>
                                <Card className="flex-1 w-100 m-4 p-4 ">
                                    <CardHeader className="flex items-center text-xl font-bold">
                                        Отклоненные объявления
                                    </CardHeader>
                                    <CardAction className="flex items-center">
                                        {Math.round(stats.rejectedPercentage)}%
                                    </CardAction>
                                </Card>
                            </CardAction>
                            <CardAction>
                                <Card>
                                    <CardHeader className="flex w-212 items-center text-xl font-bold">
                                        График активности
                                    </CardHeader>
                                    <CardAction className="flex">
                                        {loadingActivity ? "Загрузка..." : errorActivity ? "Ошибка загрузки данных" : (
                                        <ResponsiveContainer width={800} height={400}>
                                            <BarChart data={dataActivity}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" fontSize={12} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="approved" fill="#00c548ff" name="Одобренные" />
                                                <Bar dataKey="rejected" fill="#f87171" name="Отклоненные" />
                                                <Bar dataKey="requestChanges" fill="#defb00ff" name="Отправлена на доработку" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        )}
                                    </CardAction>
                                </Card>
                            </CardAction>
                            <CardAction>
                                <Card>
                                    <CardHeader>
                                        Диаграмма распределения решений
                                    </CardHeader>
                                    <CardAction className="flex">
                                        {loadingDecisions ? "Загрузка..." : errorDecisions ? "Ошибка загрузки данных" : (
                                            <ResponsiveContainer width={800} height={400}>
                                                <PieChart>
                                                    <Pie
                                                        data={arDataDecisions}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        label={({name, value}) => `${name}: ${value.toFixed(1)}`}
                                                        >
                                                        {arDataDecisions.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.name === 'Одобрены' ? '#00c548ff' : entry.name === 'Отклонены' ? '#f87171' : '#defb00ff'} />
                                                        ))}
                                                        </Pie>
                                                        <Tooltip />
                                                        <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        )}
                                    </CardAction>
                                </Card>
                            </CardAction>
                            <CardAction>
                                <Card>
                                    <CardHeader>
                                        График категорий
                                    </CardHeader>
                                    <CardAction className="flex">
                                        {loadingCategory ? "Загрузка..." : errorCategory ? "Ошибка загрузки данных" : (
                                            <ResponsiveContainer width={800} height={400}>
                                                <BarChart data={arDataCategory}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="category" fontSize={12} />
                                                    <YAxis allowDecimals={false}/>
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="value" fill="#00b14aff" name="Кол-во" />
                                                </BarChart>
                                        </ResponsiveContainer>  
                                        )}
                                            
                                    </CardAction>
                                </Card>
                            </CardAction>
                        </Card>
                    </div>
                </div>
            )
        }
        </div>
    );
}