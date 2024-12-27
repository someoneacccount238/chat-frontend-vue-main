<template>
  <section>
    <div class="container mt-5">
      <h1>Signup page</h1>
      <div class="form-group">

        <input type="text" class="form-control" v-model="userName" placeholder="user name">
        <input type="text" class="form-control" v-model="email" placeholder="email">
        <input class="form-control" v-model="pass" type="password" placeholder="password">

      </div>
      <p><nuxt-link to="/">To home page</nuxt-link></p>
      <button type="submit" @click="submitForm" class="btn btn-primary">Signup</button>

    </div>
  </section>
</template>

<script> 
import { reactive } from 'vue';

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {

  data() {
    return {
      email: '',
      pass: '',
      userName: ''
    };
  },

  methods: {
    async submitForm() {
      await fetch('http://localhost/chat-app-backend/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reactive({
          email: this.email,
          password: this.pass,
          userName: this.userName,
          avatar:'../assets/img/avatars/pexels-olly-733872.png'
        }))
      })
        .then(r => r.json()).then((data) => {

          //if error  
          if (data.message != '') {
            alert('Signup error: '+data.message);
            cookies.remove('PHPSESSID')
          }
          else this.$router.push('/messages')
          
          location.reload();

          if (!localStorage.getItem('email')) localStorage.setItem('email', this.email)
        
        })
        .catch(function (error) {
          // alert(error);
        });
    }
  }
}

</script>

<style scoped>
.container {
  width: 500px;
  margin: 0 auto;
}
</style>