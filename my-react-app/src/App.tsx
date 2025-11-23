import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import {router} from "./router.tsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000,
    },
  }, 
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;