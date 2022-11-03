<template>
    <!-- hero section -->
    <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div class="container">
            <div class="-mx-4 flex flex-wrap items-center">
                <div class="w-full px-4">
                    <div class="hero-content mx-auto max-w-[780px] text-center">
                        <h1
                            class="mb-16 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                            Sign Up</h1>
                        <!-- <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4]">Sign in to this site</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- hero section end -->

    <!-- form section -->
    <section class="bg-[#f4f7ff] py-14 lg:py-20">
        <div class="container">
            <div class="-mx-4 flex flex-wrap">
                <div class="w-full px-4">
                    <div v-if="userToken"
                        class="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-14 px-8 text-center sm:px-12 md:px-[60px]">
                        <p class="text-2xl text-dark">
                            You successfully created account: {{ userInfo.username }}!
                            <a class="text-primary hover:underline" @click="$router.go(-1)">Go back</a>
                        </p>
                    </div>
                    <div v-else
                        class="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-14 px-8 text-center sm:px-12 md:px-[60px]">
                        <div class="mb-10 mx-auto inline-block max-w-[160px]">
                            <img src="@/assets/logo.svg" alt="logo" class="w-20" />
                        </div>
                        <form action="POST" @submit.prevent="userSignUp()">
                            <div class="mb-6">
                                <input type="username" placeholder="Username"
                                    class="border-[#c9cdc4] w-full rounded-md border bg-[#fcfdfe] py-3 px-5 text-base text-body-color placeholder-[#8c969e] outline-none focus:border-primary focus-visible:shadow-none"
                                    v-model="signUpDetails.username" />
                            </div>
                            <div class="mb-6">
                                <input type="email" placeholder="Email"
                                    class="border-[#c9cdc4] w-full rounded-md border bg-[#fcfdfe] py-3 px-5 text-base text-body-color placeholder-[#8c969e] outline-none focus:border-primary focus-visible:shadow-none"
                                    v-model="signUpDetails.email" />
                            </div>
                            <div class="mb-6">
                                <input type="password" placeholder="Password"
                                    class="border-[#c9cdc4] w-full rounded-md border bg-[#fcfdfe] py-3 px-5 text-base text-body-color placeholder-[#8c969e] outline-none focus:border-primary focus-visible:shadow-none"
                                    v-model="signUpDetails.password" />
                            </div>
                            <div class="mb-6">
                                <input type="password" placeholder="Re-enter Password"
                                    class="border-[#c9cdc4] w-full rounded-md border bg-[#fcfdfe] py-3 px-5 text-base text-body-color placeholder-[#8c969e] outline-none focus:border-primary focus-visible:shadow-none"
                                    v-model="signUpDetails.rePassword" />
                            </div>
                            <div class="mb-6">
                                <input type="submit" value="Sign Up"
                                    class="border-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md" />
                            </div>
                        </form>
                        <p class="text-base text-[#adadad]">
                            Already a member?
                            <router-link to="/sign-in" class="text-primary hover:underline">
                                Sign In
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import gql from 'graphql-tag'
import { useUserStore } from "@/store/user"

export default {
    name: "SignUpView",

    setup() {
        const userStore = useUserStore()
        return { userStore }
    },

    data() {
        return {
            signUpDetails: {
                username: "",
                email: "",
                password: "",
                rePassword: "",
            },
            userToken: this.userStore.getToken || "",
            userInfo: this.userStore.getUser || {},
        };
    },

    methods: {
        async userSignUp() {
            if (this.signUpDetails.password === this.signUpDetails.rePassword) {
                // Register user
                await this.$apollo.mutate({
                    mutation: gql`mutation ($username: String!, $email: String!, $password: String!) {
                        createUser(username: $username, email: $email, password: $password){
                            user {
                                id
                            }
                        }
                    }`,
                    variables: {
                        username: this.signUpDetails.username,
                        email: this.signUpDetails.email,
                        password: this.signUpDetails.password,
                    },
                })

                const user = await this.$apollo.mutate({
                    mutation: gql`mutation ($username: String!, $password: String!) {
                        tokenAuth(username: $username, password: $password) {
                            token
                            user {
                                id
                                username
                                firstName
                                lastName
                                avatar
                            }
                        }
                    }`,
                    variables: {
                        username: this.signUpDetails.username,
                        password: this.signUpDetails.password,
                    },
                })
                this.userStore.setToken(user.data.tokenAuth.token)
                this.userStore.setUser(user.data.tokenAuth.user)
                window.location.reload()
            }
        },
    },

    created() {
        // console.log("from sign-in view")
    }
}
</script>