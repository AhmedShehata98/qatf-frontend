import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image"],
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
