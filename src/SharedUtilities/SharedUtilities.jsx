export const BASE_URL = import.meta.env.VITE_node_environment === 'production'
    ? 'https://gadgetswap-rental-marketplace-server-side.vercel.app'
    : 'http://localhost:3000';

console.log(`Current BASE_URL: ${BASE_URL}`);
