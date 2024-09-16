<script setup lang="ts">
const user = useSupabaseUser()
const login = ref(false);

async function toggleLogin(){
  if(user.value){
    await navigateTo('/stock');
  }else{
    login.value = true;
  }
}
</script>

<template>
  <div class="relative isolate overflow-hidden">
    <svg
      class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true">
      <defs>
        <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1"
          patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
    </svg>
    <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <div class="mt-24 sm:mt-32 lg:mt-16">
          <Badge>
            Stay Ahead of the Crowd
          </Badge>
        </div>
        <h1 class="mt-10 text-4xl font-bold tracking-tight  sm:text-6xl">Get Instant Stock Updates for
          Unifi Products</h1>
        <p class="mt-6 text-lg leading-8">Sign up, add the Unifi products you want, and get a
          text the moment they are available again. No more checking stock manually.</p>
        <div class="mt-10 flex items-center gap-x-6" v-if="!login">
          <AddStock>
            <template #trigger>
              <Button>Start Tracking</Button>
            </template>
          </AddStock>
          <Button variant="outline" @click="toggleLogin">
            Login
          </Button>
        </div>
        <div class="mt-10 flex items-center gap-x-6" v-else>
          <Login text="Login" />
        </div>
      </div>
      <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div
            class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <ProductScreenshot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>