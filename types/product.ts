export type ProductTag = "عرض خاص" | "كمية محدودة";

export interface Product {
  name: string;
  price: string;
  image: string;
  unit: string;
  tags: ProductTag[];
}
