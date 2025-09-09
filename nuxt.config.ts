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
    "@nuxt/image",
    "nuxt-gtag",
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
      exclude: ["/privacy-policy", "/terms-of-use"],
    },
  },
  gtag: {
    id: "G-WNCXB1Q2WC",
  },
});
