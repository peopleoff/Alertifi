import { type Product } from "~/types/unifi";

export const useProducts = (): Ref<{ products: Product[]; tempProduct: Product | null }> => {
  // Specify the return type
  return useState("useProducts", () => ({ products: [], tempProduct: null }));
};