<template>
    <!-- hero section -->
    <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div class="container">
            <div class="-mx-4 flex flex-wrap items-center">
                <div class="w-full px-4">
                    <div v-if="postsBySlug" class="hero-content mx-auto max-w-[780px] text-center">
                        <h1
                            class="mb-16 text-3xl leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                            {{ postsBySlug.title }}</h1>
                        <!-- <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4]">Sign in to this site</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- hero section end -->

    <!-- post detail -->
    <section class="bg-[#f4f7ff] pt-10 pb-10 lg:pt-[120px] lg:pb-20">
        <div class="container">
            <div class="-mx-4 flex flex-wrap justify-center">
                <div v-if="postsBySlug" class="w-full px-4">
                    <div class="relative z-20 mb-4 h-[300px] overflow-hidden rounded md:h-[400px] lg:h-[500px]">
                        <!-- <img :src="`https://indranaftena.pythonanywhere.com/media/${postsBySlug.featuredImage}`" alt="postImage"
                            class="h-full w-full object-cover object-center" /> -->
                        <img :src="imgSrc+postsBySlug.featuredImage" alt="postImage"
                            class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="-mx-4 flex flex-wrap justify-center">
                        <div class="bg-white w-[80%] my-4 py-4 px-4 lg:w-8/12">
                            <div v-html="postsBySlug.content"></div>
                        </div>
                    </div>
                    <div class="-mx-4 flex flex-wrap justify-center">
                        <div class="bg-white w-[80%] py-4 px-4 lg:w-8/12">
                            <div v-if="liked === true" class="pb-4">
                                You're one of {{ numberOfLikes }} people who like this post.
                                <a @click="updateLike()" v-if="user.isAuthenticated" class="text-primary hover:underline">Not like it?</a>
                            </div>
                            <div v-else class="pb-4">
                                There are {{ numberOfLikes }} people like this post.
                                <a @click="updateLike()" v-if="user.isAuthenticated" class="text-primary hover:underline">Like this post?</a>
                            </div>
                            <CommentSectionComponent v-if="approvedComments" :comments="approvedComments"
                                :postID="postsBySlug.id" :userID="user.info.id" :isAuthenticated="user.isAuthenticated">
                            </CommentSectionComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- post detail end -->

</template>

<script>
import gql from 'graphql-tag'
import { useUserStore } from "@/store/user"
import CommentSectionComponent from '../components/CommentSection.vue'

export default {
    name: "PostView",

    setup() {
        const userStore = new useUserStore()
        return { userStore }
    },

    components: { CommentSectionComponent },

    data() {
        return {
            postsBySlug: null,
            user: {
                isAuthenticated: false,
                token: this.userStore.getToken || "",
                info: this.userStore.getUser || {},
            },
            liked: false,
            numberOfLikes: 10,
        }
    },

    apollo: {
        postsBySlug: {
            query: gql`query ($slug: String!){
                postsBySlug(slug: $slug) {
                    id
                    title
                    content
                    featuredImage
                    commentSet {
                        content
                        user {
                            username
                        }
                        isApproved
                        createdAt
                    }
                    numberOfLikes
                    likes {
                        id
                    }
                }
            }`,
            variables () {
                return {
                    slug: this.$route.params.slug,
                }
            },
        },
    },

    computed: {
        approvedComments() {
            return this.postsBySlug.commentSet.filter((comment) => comment.isApproved)
        }
    },

    async created() {
        // console.log(this.user.info.id)
        // console.log(this.$route.params.slug)

        if (this.user.token) {
            this.user.isAuthenticated = true
        }

        // Get number of likes
        this.numberOfLikes = parseInt(this.postsBySlug.numberOfLikes)

        let likedUsers = this.postsBySlug.likes

        for (let likedUser in likedUsers) {
            if (likedUsers[likedUser].id === this.user.info.id) {
                this.liked = true
            }
        }
    },

    methods: {
        updateLike() {
            if (this.liked === true) {
                this.numberOfLikes = this.numberOfLikes - 1
            }
            else {
                this.numberOfLikes = this.numberOfLikes + 1
            }
            this.liked = !this.liked

            this.$apollo.mutate({
                mutation: gql`mutation ($postID: ID!, $userID: ID!) {
                    updatePostLike(postId: $postID, userId: $userID) {
                        post {
                            id
                            title
                            likes {
                                id
                            }
                        }
                    }
                }`,
                variables: {
                    postID: this.postsBySlug.id,
                    userID: this.user.info.id,
                }
            })
        }
    }
}
</script>

<style>
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>