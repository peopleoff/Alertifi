// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
    "@sentry/nuxt/module",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  supabase: {
    redirectOptions: {
      callback: "/verify",
      login: "/",
    },
  },
  sentry: {
    sourceMapsUploadOptions: {
      org: "pixeldevs",
      project: "unifichecker",
      authToken:
        "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",
    },
  },
});
