<template>
    <!-- hero section -->
    <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div class="container">
            <div class="-mx-4 flex flex-wrap items-center">
                <div class="w-full px-4">
                    <div class="hero-content mx-auto max-w-[780px] text-center">
                        <h1
                            class="mb-16 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                            Posts by {{ tagDisplay }}</h1>
                        <!-- <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4]">Sign in to this site</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- hero section end -->

    <!-- post list -->
    <section class="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div class="container">
            <div class="-mx-4 flex flex-wrap">
                <div v-for="post in postsByTag" :key="post.title" class="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div class="group mb-10">
                        <div class="mb-8 overflow-hidden rounded">
                            <router-link :to="`/post/${post.slug}`" class="block">
                                <img
                                    :src="`https://indranaftena.pythonanywhere.com/media/${post.featuredImage}`"
                                    alt="image"
                                    class="w-full transition group-hover:scale-125"
                                />
                            </router-link>
                        </div>
                        <div>
                            <span class="mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                                {{ post.createdAt }}
                            </span>
                            <h3>
                                <router-link
                                    :to="`/post/${post.slug}`"
                                    class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                                >
                                    {{ post.title }} by {{ post.user.firstName }}
                                </router-link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- post list end-->

</template>

<script>
import gql from "graphql-tag"

export default {
    name: "CategoryView",

    data() {
        return {
            postsByCategory: null,
            tagDisplay: this.$route.params.tag
        }
    },

    apollo: {
        postsByTag: {
            query: gql`query ($tag: String!){
                postsByTag(tag: $tag) {
                    title
                    slug
                    featuredImage
                    createdAt
                    user {
                        firstName
                        lastName
                    }
                }
            }`,
            variables() {
                return {
                    tag: this.$route.params.tag
                }
            }
        }
    },

    created() {
        console.log(this.$route.params.tag)
    },

}
</script>