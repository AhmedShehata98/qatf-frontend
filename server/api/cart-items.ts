import { createDirectus, createItem, rest, withToken } from "@directus/sdk";
import type { CreateCartItemType } from "~/types/cart";

export default defineEventHandler(async (event) => {
  try {
    if (event.method === "POST") {
      const body = await readBody<CreateCartItemType>(event);

      if (
        !body.productName ||
        !body.unitPrice ||
        !body.total ||
        !body.cartId ||
        !body.productId ||
        !body.quantity
      ) {
        return createError({
          statusCode: 400,
          statusMessage: "All fields are required",
          message:
            "required fields are missing [ productName, unitPrice, total, cartId, productId, quantity ]",
        });
      }

      const res = await createCartItem(body);
      return {
        statusCode: 200,
        message: "Cart item created successfully",
        data: res,
      };
    }
    return createError({
      statusCode: 405,
      statusMessage: "Method not allowed",
    });
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
      message: error instanceof Error ? error.message : "Method not allowed",
    });
  }
});

async function createCartItem(cartItem: CreateCartItemType) {
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
