import React from 'react';
import NavbarComponent from "../Components/NavbarComponent/NavbarComponent.jsx";
import FooterComponent from "../Components/FooterComponent/FooterComponent.jsx";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";


const MainLayout = () => {
    return (
        <div>

            <NavbarComponent></NavbarComponent>

            <Outlet></Outlet>

            <FooterComponent></FooterComponent>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            ></ToastContainer>

        </div>
    );
};

export default MainLayout;
