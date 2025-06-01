export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = useRuntimeConfig().public.directusUrl;

  try {
    const token = useRuntimeConfig().public.directusAccessToken;
    const message = await $fetch(`${url}/items/messages`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: message, success: true };
  } catch (error: any) {
    console.error("error", error);
    return createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
