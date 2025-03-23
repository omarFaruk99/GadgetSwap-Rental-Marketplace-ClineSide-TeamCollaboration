import {StrictMode} from 'react'
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import MainLayout from "./Layouts/MainLayout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import AboutPage from "./Pages/AboutPage/AboutPage.jsx";
import SignUpPage from "./Pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./Pages/SignInPage/SignInPage.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Error404 from "./Pages/Error404Page/Error404Page.jsx";


const queryClient = new QueryClient()


const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path={'/'} element={<MainLayout></MainLayout>}>
                            <Route path={'/'} element={<HomePage></HomePage>}></Route>
                            <Route path={'/about'} element={<AboutPage></AboutPage>}></Route>
                            <Route path={'/sign-up'} element={<SignUpPage></SignUpPage>}></Route>
                            <Route path={'/sign-in'} element={<SignInPage></SignInPage>}></Route>
                        </Route>
                        <Route path={'*'} element={<Error404></Error404>}></Route>
                    </Routes>
                </QueryClientProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
