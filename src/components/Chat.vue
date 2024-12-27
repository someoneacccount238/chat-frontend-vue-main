<template> 
  <div class="container">
    <div class="row">
      <div class="col-lg-12 chat text-center services__text_large mt-5">
        <div class="col-lg-12 chat__box text-center mx-auto ">
          <div class="empty-div">
          </div>
          <UsersBlock v-on:changeUser="changeUser" />

          <div class="header-chat">

            <img src="../assets/img/user.png" class="userIcon" />
            <p class="name">{{ userName }}</p>
          </div>

          <div class="messages-chat">

            <Message v-for="{ id, msg,  from, to, createdAt } in historyMsgsArr" :key="id" :from="from" :to="to"
              :photo-url="avatar" :sender="from === email" :createdAt="createdAt" >
              {{ msg }}
            </Message>

            <Message v-for="{ id, msg,  from, to, createdAt } in msgArr" :key="id" :from="from" :to="to"
               :sender="from === email" :createdAt="createdAt"  >
              {{ msg }}
            </Message>

            <div class="start-chat" v-if="userName === ''">
              <img src="../assets/img/start-chat.png" class="start-chat-img" />
              <h3>Start a new chat</h3>
            </div>

            <!-- 👇 Element created at the bottom -->
            <div ref="bottomEl"></div>


            <!--  if date is today, show only time -->
          </div>
          <hr class="divider">

          <input class="input" v-model="msgText" autofocus>
          <button type="submit" class="sendBtn" @click="sendMsg">
            <img src="../assets/img/send-btn.png" class="sendImg" />
          </button>

        </div>
      </div>
    </div>

    <div ref="bottom" class="mt-20" />


  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import Message from './Message.vue'
import UsersBlock from './UsersBlock.vue'
import Navbar from './Navbar.vue'
import { inject } from 'vue'


export default {
  components: { Message, UsersBlock },

  data() {
    return {
      cookie: cookies.get('PHPSESSID'),
      msgText: '',
      msgArr: [],
      email: localStorage.getItem('email'),
      fullMessage: this.userName,
      historyMsgsArr: reactive([]),
      avatar:''
    };
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    selectedContactEmail() {
      return this.$store.state.userEmail;
    } 
  }, 
  updated() {
    this.scrollToElement();
    this.avatar = this.$store.state.avatar;
  },
  mounted() {
    console.log(this.fullMessage)
  },

  methods: {
    scrollToElement() {
      const el = this.$refs.bottomEl;

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: 'instant' });
      }
    },
    async sendMsg() {

      await fetch('http://localhost/chat-app-backend/api/new_message.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reactive({
          id: Number(new Date()), 
          msg: this.msgText,
          createdAt: new Date(),
          from: this.email,
          to: this.selectedContactEmail
        }))
      })
        .then((res) => {
          success = true
        })
        .catch((error) => {
          // error = error.data.message
        }
        )

      this.msgArr = []

      this.msgArr.push({
        id: Number(new Date()),
        avatar: localStorage.getItem('avatar'),
        msg: this.msgText,
        createdAt: new Date(),
        from: localStorage.getItem('email'),
        to: this.email
      })
      this.msgText = '' // This will clear input 
    },
    async changeUser() {

      await fetch('http://localhost/chat-app-backend/api/get_msg_history.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: this.email,
          to: this.selectedContactEmail
        })
      })
        .then(r => r.json()).then((res) => {
          var dataObj = JSON.parse(res.message);

          //BUG FIX
         // this.msgArr = []
          this.historyMsgsArr = []

          for (var i in dataObj)
            this.historyMsgsArr.push(dataObj[i]);

          success = true

        })
        .catch((error) => {
          //error = error.data 
        }
        )
    }
  } 
}


</script>


<style scoped> 
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Marmelad&family=Wire+One&display=swap");
@import url("https://fonts.googleapis.com/css?family=Arimo");
@import url("https://fonts.googleapis.com/css2?family=Bangers&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Caveat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins&family=Satisfy&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins&family=Rubik:ital,wght@0,300..900;1,300..900&family=Satisfy&display=swap");

* {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

body {
  margin: 0px;
}

.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg,
      rgba(117, 84, 160, 1) 7%,
      rgba(117, 84, 160, 1) 17%,
      rgba(106, 95, 168, 1) 29%,
      rgba(99, 103, 174, 1) 44%,
      rgba(87, 116, 184, 1) 66%,
      rgba(70, 135, 198, 1) 83%,
      rgba(44, 163, 219, 1) 96%,
      rgba(22, 188, 237, 1) 100%,
      rgba(0, 212, 255, 1) 100%);
}

.card {
  width: 200px;
  position: relative;
  left: calc(50vw - 100px);
  text-align: center;
  padding-top: 6vw;
}

.title {
  padding-top: 32px;
  font-size: 22px;
  color: white;
  font-weight: 700;
}

input {
  width: calc(100% - 16px);
  margin-top: 12px;
  padding: 8px;
  outline: none;
  border: 1px solid #e6f7ff;
}

button {
  margin-top: 12px;
  width: 100%;
  padding: 8px;
}


body {
  background-color: rgb(248, 240, 226) !important;

}

.chat__box {
  width: 1300px !important;
  height: 550px;
  display: flex;
  justify-content: center !important;
  margin-bottom: 0 !important;
}

.services__text_large {
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  text-align: center !important;
  font-size: 34px;
  color: black !important;
  /* background-color: black; */
}

.input {
  display: flex;
  height: 50px;
  position: absolute;
  bottom: -120px !important;
  right: 0 !important;
  width: 600px;
  margin: 20px;
  margin-right: 70px;
  border: none;

}

.sendImg {
  width: 50px;
}

.sendBtn {
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: -110px !important;
  display: flex;
  justify-content: start;
}

.sendBtn:active {
  border: 1px solid blue;
}

.messages-chat {
  width: 720px;
  position: absolute;
  margin-right: -30px !important;
  overflow-y: scroll !important;
  height: 550px;
  left: 400px;

  font-size: 11pt;

}

.userIcon {
  width: 30px;
}

.divider {
  width: 700px;
  height: 3px;
  position: absolute;
  bottom: -60px !important;
  right: 0 !important;

  border: none;
  height: 1px;
  /* Set the hr color */
  color: #333;
  /* old IE */
  background-color: #d3d3d3;
  /* Modern Browsers */
}

.start-chat-img {
  width: 200px;
}

.header-chat {
  margin-top: -100px;
}
</style>