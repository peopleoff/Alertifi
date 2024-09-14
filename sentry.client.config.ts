import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: "https://2d94e37672e8d6d3eb15d2b19e9ef51d@o507739.ingest.us.sentry.io/4507953617633280",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
