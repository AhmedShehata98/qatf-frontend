export type ProductTag = "عرض خاص" | "كمية محدودة";
export enum CurrencyEnum {
  SAR = "sar",
  USD = "usd",
  DINAR = "dinar",
  EGP = "egp",
}
export enum ProductUnit {
  KG = "kgm",
  GM = "gram",
  item = "item",
  DISH = "Dish",
  CUP = "cup",
  Outstanding = "Outstanding",
  tons = "tons",
  QANTAR = "qantar",
  BOX = "box",
  SOUBATE = "soubate",
  NET = "net",
}

export const currencyMap: Record<CurrencyEnum, string> = {
  [CurrencyEnum.SAR]: "ريال سعودي",
  [CurrencyEnum.USD]: "دولار امريكي",
  [CurrencyEnum.DINAR]: "دينار",
  [CurrencyEnum.EGP]: "جنيه مصري",
};

export const unitMap: Record<ProductUnit, string> = {
  [ProductUnit.KG]: "كيلو غرام",
  [ProductUnit.GM]: "جرام",
  [ProductUnit.item]: "وحدة / حبة",
  [ProductUnit.DISH]: "طبق",
  [ProductUnit.CUP]: "كوب",
  [ProductUnit.Outstanding]: "معلقة",
  [ProductUnit.tons]: "طن",
  [ProductUnit.QANTAR]: "قنطار",
  [ProductUnit.BOX]: "صندوق",
  [ProductUnit.SOUBATE]: "سوباطة",
  [ProductUnit.NET]: "شبكة",
};
export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  currency: CurrencyEnum;
  unit: ProductUnit;
  tags: string[];
  stock: number;
}
