import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
    // for Netlify
    uri: 'https://indranaftena.pythonanywhere.com/graphql',
    // for local
    // uri: 'http://localhost:8000/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

const app = createApp(App)

app.use(apolloProvider)
app.use(createPinia())
app.use(router)
app.config.globalProperties.imgSrc = 'https://indranaftena.pythonanywhere.com/media/'
// app.config.globalProperties.imgSrc = 'http://localhost:8000/media/'

app.mount('#app')
