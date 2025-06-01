import { createDirectus, createItem, rest, withToken } from "@directus/sdk";

type CreateCartItemType = {
  cartId: number;
  productId: number;
  quantity: number;
};

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as CreateCartItemType;
    switch (event.method) {
      case "POST":
        const res = await createCartItem(body);
        return {
          statusCode: 200,
          message: "Cart item created successfully",
          data: res,
        };
      default:
        throw createError({
          statusCode: 405,
          statusMessage: "Method not allowed",
        });
    }
  } catch (error: any) {
    if (error.statusCode === 405) {
      throw error;
    }
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || "Create cart item failed",
      message: error?.message || "An unexpected error occurred",
    });
  }
});

async function createCartItem(cartItem: {
  cartId: number;
  productId: number;
  quantity: number;
}) {
  try {
    const directus = createDirectus(useRuntimeConfig().public.directusUrl).with(
      rest()
    );

    const res = await directus.request(
      withToken(
        useRuntimeConfig().public.directusAccessToken,
        createItem("cart_items", cartItem)
      )
    );
    return res;
  } catch (error) {
    if (import.meta.dev) {
      console.error(error);
    } else {
      console.error("create cart item failed");
    }
    throw error;
  }
}
