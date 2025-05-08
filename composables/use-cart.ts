import type { CartType } from "~/types/cart";
import type { Product } from "~/types/product";
export function useCart() {
  const cart = useState<CartType[]>("cart", () => []);
  const totalPrice = computed(() =>
    cart.value.reduce((acc, item) => (acc += item.price * item.quantity), 0)
  );

  const safeToStorage = (key: string, data: unknown) => {
    try {
      if (import.meta.client) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (error) {
      if (import.meta.dev) {
        console.error("error saving to storage", error);
      } else {
        console.error("error saving to storage");
      }
    }
  };
  const loadFromStorage = (key: string) => {
    try {
      if (import.meta.client) {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
      }
      return null;
    } catch (error) {
      if (import.meta.dev) {
        console.error("error loading from storage", error);
      } else {
        console.error("error loading from storage");
      }
    }
  };

  const addToCart = (product: Product) => {
    cart.value.push({ ...product, quantity: 1 });
    safeToStorage("cart", cart.value);
  };
  const removeFromCart = (product: Product) => {
    cart.value = cart.value.filter((item: any) => item.id !== product.id);
    safeToStorage("cart", cart.value);
  };

  const isInTheCart = (product: Product) => {
    if (cart.value.length === 0) return false;
    return cart.value.some((item: any) => item.id === product.id);
  };

  const increaseItemQuantity = (product: Product): void => {
    const itemIndex = cart.value.findIndex(
      (item: CartType) => item.id === product.id
    );

    if (itemIndex !== -1) {
      cart.value[itemIndex] = {
        ...cart.value[itemIndex],
        quantity: cart.value[itemIndex].quantity + 1,
      };
    }
    safeToStorage("cart", cart.value);
  };

  const decreaseItemQuantity = (product: Product): void => {
    const itemIndex = cart.value.findIndex(
      (item: CartType) => item.id === product.id
    );

    if (itemIndex !== -1 && cart.value[itemIndex].quantity > 1) {
      cart.value[itemIndex] = {
        ...cart.value[itemIndex],
        quantity: cart.value[itemIndex].quantity - 1,
      };
    }
    safeToStorage("cart", cart.value);
  };

  const getCartQuantity = () => {
    return cart.value.length;
  };

  const clearCart = () => {
    cart.value = [];
    safeToStorage("cart", []);
  };

  onMounted(() => {
    const savedCart = loadFromStorage("cart");
    if (savedCart) {
      cart.value = savedCart;
    }
  });

  return {
    cart,
    totalPrice: toRef(totalPrice),
    addToCart,
    removeFromCart,
    getCartQuantity,
    isInTheCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
  };
}
