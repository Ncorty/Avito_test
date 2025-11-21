import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"
import { Button } from "../components/ui/button";

interface ads{
    name: string;
    cost: number;
    category: string;
    date: string;
    status: string;
    priority: string;
    imageUrl: string;
}

export const listPage = () => {
    // const [status, setStatus] = React.useState([]);
    const [sortBy, setSortBy] = React.useState("date");//date, price, priority
    const [filterBy, setFilterBy] = React.useState("");//status, category, price range, none
    const [ads, setAds] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const filterAds = ads.filter(ad =>
        ad.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return (
    <div>
        <header>
            {/*надо потом добавить фильтры и сортировку*/}
        </header>
        <div>
            {/*надо потом добавить пагинацию и вывод 10 элемнтов*/}
            <Card className="w-fill border-2 border-gray-300 rounded-lg mx-4 px-4">
            <CardHeader>
                {/*надо потом добавить заполнением данным с бэка*/}
                <CardTitle>Название объявления</CardTitle> 
                <CardDescription>Категория</CardDescription>
                <CardDescription>Дата создания</CardDescription>
                <CardDescription>Статус(на модерации/одобрено/отклонено)</CardDescription>
                <CardDescription>Индикатор? обычный : срочный</CardDescription>
                <CardContent className="flex justify-end">
                    <img src="ссылка на картинку с бэка" alt="image"/>
                </CardContent>
                <CardFooter>Цена</CardFooter>
                <CardFooter className="flex justify-end">
                    <Button variant="default">Подробнее</Button>
                </CardFooter>
            </CardHeader>
            </Card>
        </div>
    </div>
);
}