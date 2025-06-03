import type { Product } from "./product";

export type CartType = Product & { quantity: number };
export type CreateCartItemType = {
  cartId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
};
export type CreateCartType = {
  form: {
    companyName: string;
    phoneNumber: string;
    activity: string;
    isOrderedBefore: boolean;
  };
  totalPrice: number;
};
