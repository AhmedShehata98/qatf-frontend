import type { Product } from "~/types/product";

export const PRODUCTS_IMAGES: string[] = [
  "/images/products/carrots.jpg",
  "/images/products/greens.jpg",
  "/images/products/potato.jpg",
  "/images/products/tomato.png",
  "/images/products/tomato.png",
  "/images/products/potato.jpg",
  "/images/products/tomato.png",
  "/images/products/tomato.png",
];

export const HOME_PRODUCTS: Product[] = [
  {
    name: "طماطم معبأة جاهزة للبيع",
    image: PRODUCTS_IMAGES[3],
    price: "100 ريال سعودي",
    unit: "الصندوق",
    tags: ["عرض خاص"],
  },
  {
    name: "بنجر",
    image: PRODUCTS_IMAGES[5],
    price: "---",
    unit: "",
    tags: [],
  },
  {
    name: "ورق خضرة",
    image: PRODUCTS_IMAGES[1],
    price: "20 ريال سعودي",
    unit: "الكيلو",
    tags: ["عرض خاص"],
  },
  {
    name: "بطاطس",
    image: PRODUCTS_IMAGES[2],
    price: "100 ريال سعودي",
    unit: "الطن",
    tags: [],
  },
  {
    name: "طماطم معبأة جاهزة للبيع",
    image: PRODUCTS_IMAGES[3],
    price: "100 ريال سعودي",
    unit: "الصندوق",
    tags: ["عرض خاص", "كمية محدودة"],
  },
  {
    name: "طماطم جبلية",
    image: PRODUCTS_IMAGES[3],
    price: "100 ريال سعودي",
    unit: "الطن",
    tags: ["كمية محدودة"],
  },
  {
    name: "بطاطس",
    image: PRODUCTS_IMAGES[2],
    price: "100 ريال سعودي",
    unit: "الطن",
    tags: [],
  },
  {
    name: "طماطم معبأة جاهزة للبيع",
    image: PRODUCTS_IMAGES[3],
    price: "100 ريال سعودي",
    unit: "الصندوق",
    tags: ["عرض خاص", "كمية محدودة"],
  },
  {
    name: "طماطم جبلية",
    image: PRODUCTS_IMAGES[3],
    price: "100 ريال سعودي",
    unit: "الطن",
    tags: ["كمية محدودة"],
  },
];
export const farmStats = [
  {
    value: "122",
    label: "ألف طن يتم إنتاجه يومياً من مزارعنا",
    isActive: false,
  },
  {
    value: "12",
    label: "مزرعة في أنحاء المملكة السعودية",
    isActive: false,
  },
  {
    value: "100%",
    label: "طعام خارج مباشرة من مزارعنا",
    isActive: true,
  },
  {
    value: "+25",

    label: "سنة خبرة في مجال الزراعة وخاصة للخضروات",
    isActive: false,
  },
];
