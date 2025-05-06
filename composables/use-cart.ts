import type { CartType } from "~/types/cart";
import type { Product } from "~/types/product";
export function useCart() {
  const cart = useState<CartType[]>("cart", () => []);

  const addToCart = (product: Product) => {
    cart.value.push({ ...product, quantity: 1 });
  };
  const removeFromCart = (product: Product) => {
    cart.value = cart.value.filter((item: any) => item.id !== product.id);
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
  };

  const getCartTotalPrice = () => {
    return cart.value.reduce(
      (total: number, item: any) => total + item.price,
      0
    );
  };
  const getCartQuantity = () => {
    return cart.value.length;
  };
  return {
    cart,
    addToCart,
    removeFromCart,
    getCartTotalPrice,
    getCartQuantity,
    isInTheCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  };
}
