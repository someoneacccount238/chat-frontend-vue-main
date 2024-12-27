<template>
    <RouterView />
</template>

<script>
import {RouterView} from 'vue-router'
import Navbar from './components/Navbar.vue'

export default {

}
</script>

<style>
.input {
  display: flex;
  align-items: end !important;
  justify-content: end !important;
  height: 50px;
  position: absolute;
  bottom: 0 !important;
  right: 0;
  width: 400px;
  margin: 20px;

}

.sendImg {
  width: 50px;
  margin-right: 100px !important;
}

.sendBtn {
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 0 !important;
  right: 0 !important;
  margin: 20px;

}

.sendBtn:active {
  border: 1px solid blue;
}
</style>