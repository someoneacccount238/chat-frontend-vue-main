<template>
    <nav class="menu">
        <ul class="items">
            <li class="item">

                <router-link class="nav-link" style="color: #a2b8f5

; text-decoration: none;" to="/messages">
                    <h1>{{ cookie }}</h1><i class="fa fa-home" aria-hidden="true">
                    </i></router-link>
            </li>
            <li class="item item-active">
                <router-link class="nav-link" style="color: #a2b8f5

; text-decoration: none;" to="/messages">
                    <i class="fa fa-commenting" aria-hidden="true"></i>
                </router-link>
            </li>
            <li class="item">
                <router-link class="nav-link" style="color: #a2b8f5

; text-decoration: none;" to='/settings'>

                    <i class="fa fa-cog" aria-hidden="true"></i></router-link>
            </li>
            <li class="item" v-if="cookie">
                <router-link class="nav-link" style="color: #a2b8f5

; text-decoration: none;" to='#' @click="logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i></router-link>
            </li>
            <li class="item" v-else-if="!cookie">
                <router-link class="nav-link" style="color: #a2b8f5

; text-decoration: none;" to="/login" id="login">
                    <i class="fa fa-sign-in" aria-hidden="true"></i></router-link>
            </li>
            <!---sign up !--->
            <li class="item" v-if="!cookie">
                <router-link class="nav-link" style="color: #a2b8f5

; text-decoration: none;" to="/signup" id="signup">
                    <i class="fa fa-user" aria-hidden="true"></i></router-link>
            </li>


        </ul>
    </nav>
    <router-view />
</template>

<script> 

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default {
    data() {

    },
    computed: {
        cookie() {
            return cookies.get('PHPSESSID');
        }
    },
    methods: {
        logout() {
            cookies.remove('PHPSESSID') 
            localStorage.removeItem("avatar");      
            localStorage.removeItem("email");
            location.reload();

        }
    },

    // mounted() {
    //     console.log({ router: this.$router });
    // }
} 
</script>
<style>
.navbar{
    position: absolute;
    top:0 !important;
}</style>