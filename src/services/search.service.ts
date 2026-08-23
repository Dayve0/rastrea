import { AxiosInstance } from "@/lib/api";
import { Offer } from "@/lib/types";

class SearchService {
    private static instance: SearchService;


    public static getInstance(): SearchService {
        if (!this.instance) {
            this.instance = new SearchService();
        }
        return this.instance;
    }


    public async search(query: string, store: string) {
        try {
            const res = await AxiosInstance.get("", { params: { "termo": query, "loja": store } });


            const results: Offer[] = res.data.dados.map((offer: Offer) => ({
                ...offer,
                storeId: store
            }));

            return results;
        } catch (error) {
            console.error("Erro ao buscar ofertas", error);
            throw new Error(`Erro ao buscar ofertas: ${error}`);
        }
    }

}

export default SearchService.getInstance();