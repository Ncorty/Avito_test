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
    return ( 
        <div className="bg-gray-50 min-h-screen py-10">
            {!isLoading && !error && stats && (
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <div className="flex gap-4 mb-8 justify-center">{/*Здесь будут кнопки для выбора периода*/}
                        <Button variant="outline" className={date === "today" ? "border-blue-500 text-blue-600 font-bold" : ""} onClick={() => setDate("today")}>Сегодня</Button>
                        <Button variant="outline" className={date === "week" ? "border-blue-500 text-blue-600 font-bold" : ""} onClick={() => setDate("week")}>Последняя неделя</Button>
                        <Button variant="outline" className={date === "month" ? "border-blue-500 text-blue-600 font-bold" : ""} onClick={() => setDate("month")}>Последний месяц</Button>
                    </div>
                    <div className="w-full flex flex-col items-center">{/*Здесь будет отображение статистики*/}
                        <Card className="flex bg-white rounded-xl shadow p-6 mx-auto">
                            <CardHeader className="text-2xl font-bold mb-4">
                                Статистика за {date === "today" ? "сегодня" : date === "week" ? "последнюю неделю" : "последний месяц"}
                            </CardHeader>
                            <CardAction className="flex flex-wrap gap-6 mb-6 justify-center">
                                <Card className="flex-1 min-w-[220px] bg-gray-50 rounded-lg shadow p-4">
                                    <CardHeader className="flex items-center text-xl font-bold mb-2">
                                        Объявлений проверено
                                    </CardHeader>
                                    <CardAction className="flex items-center text-2xl font-semibold text-blue-600">
                                        {stats.totalReviewed}
                                    </CardAction>
                                </Card>
                                <Card className="flex-1 min-w-[220px] bg-gray-50 rounded-lg shadow p-4">
                                    <CardHeader className="flex items-center text-xl font-bold mb-2">
                                        Среднее Время
                                    </CardHeader>
                                    <CardAction className="flex items-center text-2xl font-semibold text-blue-600">
                                        {!!hours && `${hours} ч`} {!!minutes && `${minutes} мин`} {sec} с
                                    </CardAction>
                                </Card>
                                <Card className="flex-1 min-w-[220px] bg-gray-50 rounded-lg shadow p-4">
                                    <CardHeader className="flex items-center text-xl font-bold mb-2">
                                        Одобренные объявления
                                    </CardHeader>
                                    <CardAction className="flex items-center text-2xl font-semibold text-green-600">
                                        {Math.round(stats.approvedPercentage)}%
                                    </CardAction>
                                </Card>
                                <Card className="flex-1 min-w-[220px] bg-gray-50 rounded-lg shadow p-4">
                                    <CardHeader className="flex items-center text-xl font-bold mb-2">
                                        Отклоненные объявления
                                    </CardHeader>
                                    <CardAction className="flex items-center text-2xl font-semibold text-red-500">
                                        {Math.round(stats.rejectedPercentage)}%
                                    </CardAction>
                                </Card>
                            </CardAction>
                            <CardAction className="w-full flex justify-center">
                                <Card className="bg-gray-50 rounded-lg shadow p-4 my-6 w-full max-w-4xl mx-auto">
                                    <CardHeader className="flex w-212 items-center text-xl font-bold mb-4">
                                        График активности
                                    </CardHeader>
                                    <CardAction className="flex justify-center">
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
                            <CardAction className="w-full flex justify-center">
                                <Card className="bg-gray-50 rounded-lg shadow p-4 my-6 w-full max-w-4xl mx-auto">
                                    <CardHeader className="mb-4">
                                        Диаграмма распределения решений
                                    </CardHeader>
                                    <CardAction className="flex justify-center">
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
                            <CardAction className="w-full flex justify-center">
                                <Card className="bg-gray-50 rounded-lg shadow p-4 my-6 w-full max-w-4xl mx-auto">
                                    <CardHeader className="mb-4">
                                        График категорий
                                    </CardHeader>
                                    <CardAction className="flex justify-center">
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