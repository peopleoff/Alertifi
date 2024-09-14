import { type Product } from "~/types/unifi";

export const useProducts = (): Ref<Product[]> => {
  // Specify the return type
  return useState("useProducts", () => []);
};
