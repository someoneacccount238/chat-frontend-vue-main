<template>
    <div class="container1">

        <Navbar class="navbar"/>
        <Chat class="chat"/>
    </div>
</template>

<script>
import Chat from '../components/Chat.vue'
import Navbar from '../components/Navbar.vue'
export default {
    components: {
        Chat, Navbar
    }

}
</script>

<style>
.container1 {
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: row;
    position: fixed; 
}
 
.navbar { 
    width: 100%;
    height: 700px; 
    left: -25%  ; 

}

.chat { 
    width: 1200px !important;
    height: 600px; 
    left: -10%;
}
</style>