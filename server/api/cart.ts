import type { CreateCartType } from "~/types/cart";

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig().public.directusUrl;
  try {
    if (event.method === "POST") {
      const body = await readBody<CreateCartType>(event);

      if (
        !body.form.companyName ||
        !body.form.phoneNumber ||
        !body.form.activity ||
        !body.totalPrice
      ) {
        return createError({
          statusCode: 400,
          statusMessage: "invalid request body , missing required fields",
          message:
            "missing required fields companyName, phoneNumber, activity, isOrderedBefore, totalPrice",
        });
      }

      const token = useRuntimeConfig().public.directusAccessToken;
      const ticketCode = (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      ).toUpperCase();

      const cart = await fetch(`${url}/items/cart`, {
        method: "POST",
        body: JSON.stringify({
          totalPrice: body.totalPrice,
          orderStatus: "in-progress",
          isPaid: false,
          companyName: body.form.companyName,
          phoneNumber: body.form.phoneNumber,
          isOrderedBefore: body.form.isOrderedBefore,
          activity: body.form.activity,
          ticketId: `CART_${ticketCode}`,
          orderDate: new Date().toISOString(),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await cart.json();

      return {
        statusCode: 200,
        message: "cart created successfully",
        data,
      };
    }
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "internal server error",
    });
  }
});
