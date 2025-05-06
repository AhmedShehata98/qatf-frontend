import type { Product } from "./product";

export type CartType = Product & { quantity: number };
