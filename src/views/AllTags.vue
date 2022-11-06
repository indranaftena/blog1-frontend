<template>
    <!-- hero section -->
    <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div class="container">
            <div class="-mx-4 flex flex-wrap items-center">
                <div v-if="$apollo.queries.allTags.loading" class="mx-auto my-10 w-10 h-10">
                    <span class="animate-spin-slow absolute inline-flex w-10 h-10 rounded-sm bg-white/50"></span>
                </div>
                <div v-if="allTags" class="w-full px-4">
                    <div class="hero-content mx-auto max-w-[780px] text-center">
                        <h1
                            class="mb-16 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                            All Tags</h1>
                        <!-- <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4]">Sign in to this site</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- hero section end -->

    <!-- all tag section-->
    <section class="bg-[#f4f7ff] py-14 lg:py-20">
        <div class="container">
            <div class="-mx-4 flex flex-wrap px-4">
                <span v-if="$apollo.queries.allTags.loading" class="animate-spin-slow mx-auto w-20 h-20 rounded-sm bg-primary/50"></span>
                <div v-if="allTags" v-for="tag in allTags" class="relative mx-2 my-2 group hover:z-50">
                    <div class="max-w-[200px] rounded bg-white py-2 px-4 text-center shadow-md transition ease-in-out hover:scale-125">
                        <router-link :to="`/tag/${tag.slug}`" class="text-gray-700 hover:underline hover:text-gray-900">#{{
                                tag.name
                        }}</router-link>
                        <span class="hidden text-gray-500 text-xs group-hover:flex">
                            {{ tag.description }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- all tag section end-->

</template>

<script>
import gql from "graphql-tag"

export default {
    name: "AllTagsView",

    data() {
        return {
            allTags: null,
        }
    },

    apollo: {
        allTags: gql`query {
            allTags {
                name
                slug
                description
            }
        }`
    },
}
</script>