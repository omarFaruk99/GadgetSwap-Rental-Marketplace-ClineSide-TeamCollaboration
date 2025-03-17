import React from 'react';
import BannerComponent from "../../Components/BannerComponent/BannerComponent.jsx";
import FeaturedProductsComponent from "../../Components/FeaturedProductsComponent/FeaturedProductsComponent.jsx";
import HowItWorksComponent from "../../Components/HowItWorksComponent/HowItWorksComponent.jsx";
import LoyaltyAndRewardsComponent from "../../Components/LoyaltyAndRewardsComponent/LoyaltyAndRewardsComponent.jsx";
import WhatOurCustomersSayComponent from "../../Components/WhatOurCustomersSayComponent/WhatOurCustomersSayComponent.jsx";


const HomePage = () => {
    return (
        <div>
            <BannerComponent></BannerComponent>
            <FeaturedProductsComponent></FeaturedProductsComponent>
            <HowItWorksComponent></HowItWorksComponent>
            <LoyaltyAndRewardsComponent></LoyaltyAndRewardsComponent>
            <WhatOurCustomersSayComponent></WhatOurCustomersSayComponent>
        </div>
    );
};

export default HomePage;
