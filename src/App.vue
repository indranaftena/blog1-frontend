<template>
  <header>
    <!-- Navbar -->
    <!-- change from ud-header to explicitly call sticky class -->
    <div :class="{ sticky: isScrolled }"
      class="ud-header absolute top-0 left-0 z-40 flex w-full items-center bg-transparent">
      <div class="container">
        <div class="relative -mx-4 flex items-center justify-between">
          <div class="w-60 max-w-full px-4">
            <RouterLink to="/" class="navbar-logo block w-full py-5">
              <img alt="logo" :src="logoSrc" class="header-logo w-20" />
            </RouterLink>
          </div>
          <div class="flex w-full items-center justify-between px-4">
            <div>
              <button id="navbarToggler"
                class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                :class="{ navbarTogglerActive: navTogglerActive }" @click="navToggler()">
                <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              </button>
              <nav id="navbarCollapse" :class="{ hidden: isNavHidden }"
                class="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:px-4 lg:shadow-none xl:px-6">
                <ul class="block lg:flex">
                  <li class="group relative">
                    <RouterLink to="/"
                      class="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                      @click="navToggler()">Home</RouterLink>
                  </li>
                  <li class="group relative">
                    <RouterLink to="/about"
                      class="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                      @click="navToggler()">About</RouterLink>
                  </li>
                  <li class="group relative">
                    <RouterLink to="/categories"
                      class="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                      @click="navToggler()">Categories</RouterLink>
                  </li>
                  <li class="group relative">
                    <RouterLink to="/tags"
                      class="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                      @click="navToggler()">Tags</RouterLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div v-if="!user.isAuthenticated" class="hidden justify-end pr-16 sm:flex lg:pr-0">
              <RouterLink to="/sign-in" class="loginBtn py-3 px-7 text-base font-medium text-white hover:opacity-70">
                Sign In
              </RouterLink>
              <RouterLink to="/sign-up"
                class="signUpBtn rounded-lg bg-white bg-opacity-20 py-3 px-6 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark">
                Sign Up
              </RouterLink>
            </div>
            <div v-if="user.isAuthenticated" class="hidden justify-end pr-16 sm:flex lg:pr-0">
              <a class="signUpBtn rounded-lg bg-white bg-opacity-20 py-3 px-6 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark"
                @click="userSignOut()">Sign Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- End of Navbar -->

  <!-- router section -->
  <main>
    <RouterView />
  </main>
  <!-- router section end-->

  <footer class="relative z-10 bg-black pt-20 lg:pt-[120px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
          <div class="mb-10 w-full">
            <RouterLink to="/" class="mb-6 inline-block max-w-[160px]">
              <img alt="logo" src="@/assets/logo.svg" class="w-20" />
            </RouterLink>
            <p class="mb-7 text-base text-[#f3f4fe]">
              Writing is one of the most beneficial activity, so keep writing!
            </p>

            <!-- skip modsos link-->

          </div>
        </div>
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-3/12">
          <div class="mb-10 w-full">
            <h4 class="mb-9 text-lg font-semibold text-white">About Us</h4>
            <ul>
              <li>
                <RouterLink to="/" class="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary">
                  Home</RouterLink>
              </li>
              <li>
                <RouterLink to="/about"
                  class="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary">About</RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full px-4 md:w-2/3 lg:w-6/12 xl:w-6/12">
          <div class="mb-10 w-full">
            <h4 class="mb-9 text-lg font-semibold text-white">Created Using</h4>
            <ul class="flex flex-wrap items-center">
              <li>
                <a href="https://www.djangoproject.com" rel="nofollow noopner" target="_blank"
                  class="mb-6 mr-5 block max-w-[120px] xl:max-w-[100px] 2xl:max-w-[120px]">
                  <img src="@/assets/django-logo-negative.svg" alt="django" />
                </a>
              </li>
              <li>
                <a href="https://vuejs.org" rel="nofollow noopner" target="_blank"
                  class="mb-6 mr-5 block max-w-[100px] xl:max-w-[90px] 2xl:max-w-[100px]">
                  <img src="@/assets/logo-vue.svg" alt="vuejs" class="w-full"/>
                </a>
              </li>
              <li>
                <a href="https://graphql.org" rel="nofollow noopner" target="_blank"
                  class="mb-6 mr-5 block max-w-[120px] xl:max-w-[100px] 2xl:max-w-[120px]">
                  <img src="@/assets/GraphQL Logo + Wordmark (White).svg" alt="graphql" class="w-full"/>
                </a>
              </li>
              <li>
                <a href="https://github.com/TailGrids/play-tailwind" rel="nofollow noopner" target="_blank"
                  class="mb-6 mr-5 block max-w-[120px] xl:max-w-[100px] 2xl:max-w-[120px]">
                  <img src="@/assets/logo-play.svg" alt="play by tailgrids" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-opacity-40 py-8 lg:mt-[60px]">
      <div class="container">
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full px-4 md:w-2/3 lg:w-1/2">
            <div class="my-1">
              <div class="-mx-3 flex items-center justify-center md:justify-start">
                <a href="javascript:void(0)" class="px-3 text-base text-[#f3f4fe] hover:text-primary">
                  Privacy policy
                </a>
                <a href="javascript:void(0)" class="px-3 text-base text-[#f3f4fe] hover:text-primary">
                  Legal notice
                </a>
                <a href="javascript:void(0)" class="px-3 text-base text-[#f3f4fe] hover:text-primary">
                  Terms of service
                </a>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/3 lg:w-1/2">
            <div class="my-1 flex justify-center md:justify-end">
              <p class="text-base text-[#f3f4fe]">
                Designed by
                <a href="https://tailgrids.com" rel="nofollow noopner" target="_blank"
                  class="text-primary hover:underline">TailGrids and UIdeck</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
import { useUserStore } from './store/user';
import { RouterLink, RouterView } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  data() {
    return {
      isNavHidden: true,
      isScrolled: false,
      // window.location.origin return app address
      logoSrc: window.location.origin + "/src/assets/logo-white.svg",
      navTogglerActive: false,
      user: {
        isAuthenticated: false,
        token: this.userStore.getToken || "",
        info: this.userStore.getUser || {},
      },
    }
  },

  created() {
    if (this.user.token) {
      this.user.isAuthenticated = true;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll)
  },

  methods: {
    userSignOut() {
      this.userStore.removeToken();
      this.userStore.removeUser();
      window.location.reload();
    },

    onScroll() {
      const ud_header = document.querySelector(".ud-header")
      const ud_pos = ud_header.offsetTop

      // transform navbar
      if (window.pageYOffset > ud_pos) {
        this.isScrolled = true
        this.logoSrc = window.location.origin + "/src/assets/logo.svg"
      }
      else {
        this.isScrolled = false
        this.logoSrc = window.location.origin + "/src/assets/logo-white.svg"
      }
    },

    navToggler() {
      this.navTogglerActive = !this.navTogglerActive
      this.isNavHidden = !this.isNavHidden
    }
  },
}
</script>
