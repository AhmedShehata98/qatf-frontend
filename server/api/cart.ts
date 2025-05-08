import { createDirectus, createItem, rest, withToken } from "@directus/sdk";
import { CartType } from "~/types/cart";

type FormType = {
  companyName: string;
  countryCode: string;
  phone: string;
  activity: string;
  isOrderedBefore: boolean;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    switch (event.method) {
      case "POST":
        const totalPrice = body.totalPrice;
        const form = body.form as FormType;

        if (!totalPrice || !form) {
          throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Missing required fields",
          });
        }

        const res = await createCart(form, totalPrice);

        if (!res) {
          throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: "Failed to create cart",
          });
        }

        return {
          statusCode: 201,
          message: "Cart created successfully",
          data: res,
        };

      default:
        throw createError({
          statusCode: 405,
          statusMessage: "Method Not Allowed",
          message: `${event.method} method is not supported`,
        });
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message || "Something went wrong",
    });
  }
});

async function createCart(form: FormType, totalPrice: number) {
  try {
    const directus = createDirectus(useRuntimeConfig().public.directusUrl).with(
      rest()
    );

    const orderId = crypto.randomUUID();
    const isPaid = false;
    const orderStatus = "in-process";

    const cart = {
      orderId,
      ...form,
      isPaid,
      orderStatus,
      totalPrice,
    };

    const res = await directus.request(
      withToken(
        useRuntimeConfig().public.directusAccessToken,
        createItem("cart", cart)
      )
    );

    return res;
  } catch (error) {
    if (import.meta.dev) {
      console.log(error);
    } else {
      console.error("create cart failed");
    }
  }
}
