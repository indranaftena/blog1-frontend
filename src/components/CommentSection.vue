<template>
    <div>
        <div class="pb-4 font-semibold">Comments:</div>
        <div v-if="!isAuthenticated">
            you need to
            <router-link to="/sign-in" class="text-primary hover:underline">sign in</router-link>
            before you can leave a comment
        </div>
        <div v-else>
            <div v-if="commentSubmitSuccess" class="py-2">
                Your comment will show up here after it has been approved.
            </div>
            <form action="POST" @submit.prevent="submitComment" class="px-4">
                <textarea typeof="text" rows="5" v-model="commentContent" class="w-full border border-dark px-2 py-1" />
                <button class="bg-primary rounded-sm text-white py-1 px-4">Submit Comment</button>
            </form>
        </div>
        <div class="flex flex-wrap pb-8 px-4">
            <div v-for="comment in comments" class="border-b-2 w-full mt-8">
                <div class="text-dark font-bold text-xl py-1">{{ comment.user.username }}</div>
                <div class="text-gray-700 text-sm">{{ comment.createdAt }}</div>
                <div class="py-8">{{ comment.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag"

export default {
    name: "CommentSectionComponent",

    data() {
        return {
            commentContent: "",
            commentSubmitSuccess: false,
        }
    },

    props: {
        comments: {
            type: Array,
            required: true,
        },
        postID: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        isAuthenticated: {
            type: Boolean,
            required: true,
        },
    },

    methods: {
        submitComment() {
            if (this.commentContent !== "") {
                this.$apollo.mutate({
                    mutation: gql`mutation ($content: String!, $userID: ID!, $postID: ID!) {
                        createComment(content: $content, userId: $userID, postId: $postID) {
                            comment {
                                content
                            }
                        }
                    }`,
                    variables: {
                        content: this.commentContent,
                        userID: this.userID,
                        postID: this.postID,
                    },
                })
                    .then(() => (this.commentSubmitSuccess = true))
            }
        },
    },
}
</script>