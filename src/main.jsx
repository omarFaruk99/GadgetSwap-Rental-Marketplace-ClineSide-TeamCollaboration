import {StrictMode} from 'react'
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import MainLayout from "./Layouts/MainLayout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import AboutPage from "./Pages/AboutPage/AboutPage.jsx";
import ContactUsPage from "./Pages/ContactUsPage/ContactUsPage.jsx";
import FAQPage from "./Pages/FAQPage/FAQPage.jsx";
import SignUpPage from "./Pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./Pages/SignInPage/SignInPage.jsx";
import Error404 from "./Pages/Error404Page/Error404Page.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import AllGadgetsPage from "./Pages/AllGadgetsPage/AllGadgetsPage.jsx";
import GadgetDetailsPage from "./Pages/GadgetDetailsPage/GadgetDetailsPage.jsx";


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
                            <Route path={'/about-us'} element={<AboutPage></AboutPage>}></Route>
                            <Route path={'/all-gadgets'} element={<AllGadgetsPage></AllGadgetsPage>}></Route>
                            <Route path={'/all-gadgets/gadget-details/:id'} element={<GadgetDetailsPage></GadgetDetailsPage>}></Route>
                            <Route path={'/contact-us'} element={<ContactUsPage></ContactUsPage>}></Route>
                            <Route path={'/faq'} element={<FAQPage></FAQPage>}></Route>
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
