export type ProductTag = "عرض خاص" | "كمية محدودة";
export enum CurrencyEnum {
  SAR_AR = "ريال سعودي",
  USD_EN = "دولار امريكي",
  SAR = "SAR",
  USD = "USD",
}
export enum ProductUnit {
  KG_AR = "كيلو",
  GM_AR = "جرام",
  TON_AR = "طن",
  KG = "KILO",
  GM = "GRAM",
  tons = "TON",

  // item = "item",
  // DISH = "Dish",
  // CUP = "cup",
  // Outstanding = "Outstanding",
  // QANTAR = "qantar",
  // BOX = "box",
  // SOUBATE = "soubate",
  // NET = "net",
}

export const currencyMap: Record<CurrencyEnum, string> = {
  [CurrencyEnum.SAR_AR]: "ريال سعودي",
  [CurrencyEnum.USD_EN]: "دولار امريكي",
  [CurrencyEnum.SAR]: "SAR",
  [CurrencyEnum.USD]: "USD",
};

export const unitMap: Record<ProductUnit, string> = {
  [ProductUnit.KG_AR]: "كيلو غرام",
  [ProductUnit.GM_AR]: "جرام",
  [ProductUnit.TON_AR]: "طن",
  [ProductUnit.KG]: "KILO",
  [ProductUnit.GM]: "GRAM",
  [ProductUnit.tons]: "TON",
  // [ProductUnit.item]: "وحدة / حبة",
  // [ProductUnit.DISH]: "طبق",
  // [ProductUnit.CUP]: "كوب",
  // [ProductUnit.Outstanding]: "معلقة",
  // [ProductUnit.QANTAR]: "قنطار",
  // [ProductUnit.BOX]: "صندوق",
  // [ProductUnit.SOUBATE]: "سوباطة",
  // [ProductUnit.NET]: "شبكة",
};

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
  id: number;
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
    currency: CurrencyEnum;
    unit: ProductUnit;
  }[];
}
