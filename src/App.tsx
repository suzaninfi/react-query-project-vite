import { Page } from "./components/Page.tsx";
import { WithoutPage } from "./pages/WithoutPage.tsx";
import { WithPage } from "./pages/WithPage.tsx";
import { PaginatedPage } from "./pages/PaginatedPage.tsx";
import { InfinitePage } from "./pages/InfinitePage.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  // global options for all queries
  defaultOptions: {
    queries: {
      // default: refetch every time window gets focussed
      refetchOnWindowFocus: true,
      retry: 3,
      staleTime: 1000 * 10, // 10 seconds
      cacheTime: 1000 * 7, // 7 seconds
      keepPreviousData: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter basename={"/"}>
        <Page>
          <Routes>
            <Route path={"/"} />
            <Route path={"/without"} element={<WithoutPage />} />
            <Route path={"/with"} element={<WithPage />} />
            <Route path={"/paginated"} element={<PaginatedPage />} />
            <Route path={"/infinite"} element={<InfinitePage />} />
          </Routes>
        </Page>
        <ReactQueryDevtools initialIsOpen={false} />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
