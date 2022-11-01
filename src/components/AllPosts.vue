<template>
    <section class="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div class="container">
            <div class="-mx-4 flex flex-wrap">
                <div v-for="post in allPosts" :key="post.title" class="w-full px-4 md:w-1/2 lg:w-1/3">
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
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: "AllPostsView",
     
    data() {
        return {
            allPosts: null,
        }
    },

    apollo: {
        allPosts: gql`query {
            allPosts {
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
    },

    created() {
        // console.log(this.allPosts)
    }
}
</script>