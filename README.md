## Технологический стэк

| Category      | Technology                               |
|---------------|------------------------------------------|
| **Frontend**  | React                                    |
| **Routing**   | @tanstack/react-router                   |
| **State Management** | @tanstack/react-query                  |
| **UI Components** | @radix-ui/react-\*, @shadcn/ui, lucide-react, cmdk |
| **Styling**   | Tailwind CSS, @tailwindcss/vite |
| **Data Fetching** | axios                                    |
| **Build Tool**  | Vite                                     |
| **Carousel**  | embla-carousel-react                     |
| **Typescript** | Typescript                               |
| **Other**     | @types/node                             |

## Почему такой выбор
В качестве UI-kit была выбрана shadcn/ui, так как данная технология позволяет исплользовать мн-во компонентов с различными стилями и надстройками для удобства. Axios был выбран для работы с HTTP-запросами, потому что эта библиотека отличается простотой использования и лаконичным синтаксисом, отлично поддерживается и легко интегрируется с современными фреймворками. Vite был выбран в качестве инструмента сборки из-за его высокой скорости работы, мгновенного запуска dev-сервера и поддержки горячей перезагрузки модулей (HMR), что позволяет видеть изменения в интерфейсе практически сразу после сохранения кода.

### Необходимые требования

- Node.js (>=18)
- npm or yarn

### Установка

1.  Склонировать репозиторий:

    ```bash
    git clone <repository-url>
    cd my-react-app
    ```

2.  Устанавка зависимости с помощью npm:

    ```bash
    npm install
    ```

    or using yarn:

    ```bash
    yarn install
    ```
