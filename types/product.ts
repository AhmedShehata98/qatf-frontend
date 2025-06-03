export type ProductTag = "عرض خاص" | "كمية محدودة";

type Category = {
  id: string;
  translations: {
    id: string;
    languages_id: number;
    name: string;
    description: string;
  }[];
};

type ProductUnitType = {
  id: string;
  translations: {
    id: string;
    languages_id: number;
    name: string;
    value: string;
  }[];
};
export interface Product {
  id: string;
  price: number;
  image: string;
  tags: string[];
  stock: number;
  category: Category | null;
  unit: ProductUnitType | null;
  translations: {
    id: string;
    languages_id: number;
    title: string;
    currency: string;
  }[];
}
