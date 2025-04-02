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
import {Provider} from "react-redux";
import reduxStore from "./Providers/reduxStore.jsx";
import TermsAndConditionsPage from "./Pages/TermsAndConditionsPage/TermsAndConditionsPage.jsx";
import CookieSettingsPage from "./Pages/CookieSettingsPage/CookieSettingsPage.jsx";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx";
import ImprintPage from "./Pages/ImprintPage/ImprintPage.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import UserOverviewPage from "./Pages/DashboardPage/UserDashboardPages/UserOverviewPage.jsx";
import UserMyRentalsPage from "./Pages/DashboardPage/UserDashboardPages/UserMyRentalsPage.jsx";
import UserWishlistPage from "./Pages/DashboardPage/UserDashboardPages/UserWishlistPage.jsx";
import UserMessagesPage from "./Pages/DashboardPage/UserDashboardPages/UserMessagesPage.jsx";
import UserLoyaltyAndRewardPage from "./Pages/DashboardPage/UserDashboardPages/UserLoyaltyAndRewardPage.jsx";
import UserSettingsPage from "./Pages/DashboardPage/UserDashboardPages/UserSettingsPage.jsx";
import AdminTotalOverviewPage from "./Pages/DashboardPage/AdminDashboardPages/AdminTotalOverviewPage.jsx";
import AdminAllUsersPage from "./Pages/DashboardPage/AdminDashboardPages/AdminAllUsersPage.jsx";
import AdminAllGadgetsPage from "./Pages/DashboardPage/AdminDashboardPages/AdminAllGadgetsPage.jsx";
import AdminAllRentalsPage from "./Pages/DashboardPage/AdminDashboardPages/AdminAllRentalsPage.jsx";
import AdminSettingsPage from "./Pages/DashboardPage/AdminDashboardPages/AdminSettingsPage.jsx";


const queryClient = new QueryClient()


const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={reduxStore}>
                        <Routes>
                            <Route path={'/'} element={<MainLayout></MainLayout>}>
                                <Route path={'/'} element={<HomePage></HomePage>}></Route>

                                <Route path={'/all-gadgets'} element={<AllGadgetsPage></AllGadgetsPage>}></Route>
                                <Route path={'/all-gadgets/gadget-details/:id'} element={<GadgetDetailsPage></GadgetDetailsPage>}></Route>

                                <Route path={'/about-us'} element={<AboutPage></AboutPage>}></Route>
                                <Route path={'/contact-us'} element={<ContactUsPage></ContactUsPage>}></Route>
                                <Route path={'/faq'} element={<FAQPage></FAQPage>}></Route>

                                <Route path={'/sign-up'} element={<SignUpPage></SignUpPage>}></Route>
                                <Route path={'/sign-in'} element={<SignInPage></SignInPage>}></Route>

                                <Route path={'/dashboard'} element={<DashboardLayout></DashboardLayout>}>
                                    <Route path={'/dashboard/user/overview'} element={<UserOverviewPage></UserOverviewPage>} />
                                    <Route path={'/dashboard/user/my_rentals'} element={<UserMyRentalsPage></UserMyRentalsPage>} />
                                    <Route path={'/dashboard/user/wishlist'} element={<UserWishlistPage></UserWishlistPage>} />
                                    <Route path={'/dashboard/user/messages'} element={<UserMessagesPage></UserMessagesPage>} />
                                    <Route path={'/dashboard/user/loyalty_and_rewards'} element={<UserLoyaltyAndRewardPage></UserLoyaltyAndRewardPage>} />
                                    <Route path={'/dashboard/user/settings'} element={<UserSettingsPage></UserSettingsPage>} />

                                    <Route path={'/dashboard/admin/total_overview'} element={<AdminTotalOverviewPage></AdminTotalOverviewPage>} />
                                    <Route path={'/dashboard/admin/all_users'} element={<AdminAllUsersPage></AdminAllUsersPage>} />
                                    <Route path={'/dashboard/admin/all_gadgets'} element={<AdminAllGadgetsPage></AdminAllGadgetsPage>} />
                                    <Route path={'/dashboard/admin/all_rentals'} element={<AdminAllRentalsPage></AdminAllRentalsPage>} />
                                    <Route path={'/dashboard/admin/settings'} element={<AdminSettingsPage></AdminSettingsPage>} />
                                </Route>

                                <Route path={'/terms-and-conditions'} element={<TermsAndConditionsPage></TermsAndConditionsPage>}></Route>
                                <Route path={'/cookie-settings'} element={<CookieSettingsPage></CookieSettingsPage>}></Route>
                                <Route path={'/privacy-policy'} element={<PrivacyPolicyPage></PrivacyPolicyPage>}></Route>
                                <Route path={'/imprint'} element={<ImprintPage></ImprintPage>}></Route>
                            </Route>
                            <Route path={'*'} element={<Error404></Error404>}></Route>
                        </Routes>
                    </Provider>
                </QueryClientProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
