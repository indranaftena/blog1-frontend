<template>
    <!-- hero section -->
    <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div class="container">
            <div class="-mx-4 flex flex-wrap items-center">
                <div class="w-full px-4">
                    <div class="hero-content mx-auto max-w-[780px] text-center">
                        <h1
                            class="mb-16 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                            All Categories</h1>
                        <!-- <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4]">Sign in to this site</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- hero section end -->

    <!-- list section -->
    <section class="bg-[#f4f7ff] py-14 lg:py-20">
        <div class="container">
            <div class="-mx-4 flex flex-wrap px-4">
                <div v-for="category in allCategories" class="relative mx-2 my-2 max-w-[200px] rounded shadow-lg bg-white py-2 px-4 group hover:z-50 transition ease-in-out hover:scale-125">
                    <router-link :to="`/category/${category.slug}`">
                        <div
                            class="text-dark text-xl group-hover:text-primary">
                            {{ category.name }}
                        </div>
                        <span class="flex py-4 text-gray-500 text-sm">
                            {{ category.description }}
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
    <!-- list section end-->

</template>

<script>
import gql from "graphql-tag"

export default {
    name: "AllCategoriesView",

    data() {
        return {
            allCategories: null,
        }
    },

    apollo: {
        allCategories: gql`query {
            allCategories {
                name
                slug
                description
            }
        }`,
    },
}
</script>