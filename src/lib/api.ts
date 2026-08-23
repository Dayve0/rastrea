import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const AxiosInstance = axios.create({
    baseURL: `${baseUrl}/api/pesquisar`
});