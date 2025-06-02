import type { Product } from "~/types/product";

const useCartNotificationBar = () => {
  const selectedProductName = shallowRef<string | null>(null);
  const isOpenNotificationBar = shallowRef(false);
  const cartOperation = shallowRef<"add" | "remove" | null>(null);
  const { currentLocale, getLocaleObject } = useI18n();
  let timeoutId: NodeJS.Timeout | null = null;

  const addOperation = (product: Product) => {
    const mappedProduct = product.translations.find(
      (translation: { languages_id: number }) =>
        translation.languages_id.toString() ===
        getLocaleObject(currentLocale.value).id
    );
    selectedProductName.value = mappedProduct?.title || "NA-NA";
    isOpenNotificationBar.value = true;
    cartOperation.value = "add";
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      isOpenNotificationBar.value = false;
    }, 5000);
  };

  const removeOperation = (product: Product) => {
    const mappedProduct = product.translations.find(
      (translation: { languages_id: number }) =>
        translation.languages_id.toString() ===
        getLocaleObject(currentLocale.value).id
    );
    selectedProductName.value = mappedProduct?.title || "NA-NA";
    isOpenNotificationBar.value = true;
    cartOperation.value = "remove";
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      isOpenNotificationBar.value = false;
    }, 5000);
  };

  const pushNotificationBar = (
    operation: "add" | "remove",
    product: Product
  ) => {
    try {
      if (operation === "add") {
        addOperation(product);
      } else {
        removeOperation(product);
      }
    } catch (error) {
      console.error("Error pushing notification bar", error);
    }
  };

  return {
    selectedProductName,
    isOpenNotificationBar,
    cartOperation,
    pushNotificationBar,
  };
};

export default useCartNotificationBar;
