<template>
  <section>
    <div class="container mt-5">
      <h1>Login page</h1>
      <div class="form-group">
        <input type="text" class="form-control" v-model="email" placeholder="email">
        <input class="form-control" v-model="pass" type="password" placeholder="password">

      </div>
      <p><nuxt-link to="/">To home page</nuxt-link></p>
      <button type="submit" @click="submitForm" class="btn btn-primary">Login</button>

    </div>
  </section>
</template>

<script>

import router from '../router/index.js'
import { reactive } from 'vue';

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  data() {
    return {
      email: '',
      pass: ''
    };
  },
  methods: {
    async submitForm() {
      const response = await fetch('http://localhost/php-login-minimal-master/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reactive({
          email: this.email,
          password: this.pass,
            avatar:'../assets/img/avatars/pexels-olly-733872.png'
        }))
      })
        .then((data) => {

          //if error  
          if (data.message != '' && data.message !=undefined) {
            alert('Login error: ' + data.message);
            cookies.remove('PHPSESSID')
          }
          else this.$router.push('/messages')

          location.reload();

          if (!localStorage.getItem('email')) localStorage.setItem('email', this.email) 
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }
}
</script>

<style scoped>
.container {
  width: 500px !important;
  margin: 0 auto;
}
</style>