<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import AllPostsView from '../components/AllPosts.vue'
</script>

<template>
  <!-- hero section -->
  <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap items-center">
        <div v-if="$apollo.queries.mySite.loading" class="mx-auto my-10 w-10 h-10">
          <span class="animate-spin-slow absolute inline-flex w-10 h-10 rounded-sm bg-white/50"></span>
        </div>
        <div class="w-full px-4">
          <div v-if="mySite" class="hero-content mx-auto max-w-[780px] text-center">
            <h1
              class="mb-8 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug"
            >{{ mySite.name }}</h1>
            <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4] sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed">{{ mySite.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- hero section end -->

  <AllPostsView />
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "HomeView",

  data() {
    return {
      mySite: null,
    }
  },

  apollo: {
    mySite: gql`query {
      mySite: site {
        name
        description
      }
    }`,
  },
}
</script>
