import tailwindcss from "@tailwindcss/vite";

const directusDomain = process.env.DIRECTUS_URL
  ? new URL(process.env.DIRECTUS_URL).host
  : "";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image"],
  plugins: [{ src: "~/plugins/directus.ts", mode: "all" }],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      title: "قطف",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "غدائنا هو امننا نزرع لكم لتوفير الغذاء و الجودة",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL,
      directusAccessToken: process.env.DIRECTUS_ACCESS_TOKEN,
    },
  },
  image: {
    directus: {
      baseURL: `${process.env.DIRECTUS_URL}/assets` || "",
    },
  },
  vite: {
    plugins: [tailwindcss() as unknown as Plugin],
  },
  nitro: {
    routeRules: {
      "/": {
        static: 24 * 60 * 60 * 1000,
      },
      "/about-us": {
        static: 24 * 60 * 60 * 1000,
      },
      "/contact-us": {
        static: 24 * 60 * 60 * 1000,
      },
      "/daily-pricing": {
        static: 24 * 60 * 60 * 1000,
      },
      "/privacy-and-terms": {
        static: 24 * 60 * 60 * 1000,
      },
    },
  },
});
