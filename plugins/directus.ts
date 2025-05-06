import { createDirectus, graphql, readItem, readItems } from "@directus/sdk";
import type { FooterType } from "~/types/footer";

interface Schema {
  appFooter: FooterType;
}

const directus = (directusUrl: string) =>
  createDirectus<Schema>(directusUrl).with(graphql());

export default defineNuxtPlugin(() => {
  const DIRECTUS_URL = useRuntimeConfig().public.directusUrl;
  if (!DIRECTUS_URL) {
    throw new Error("DIRECTUS URL is not defined");
  }

  return {
    provide: {
      directus: directus(DIRECTUS_URL),
      readItem,
      readItems,
    },
  };
});
