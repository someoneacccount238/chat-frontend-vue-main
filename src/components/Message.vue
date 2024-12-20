<template>
  <div class="Message"> 
      <div class="message" >
        <img v-if="!sender" class="photo" :src="getImageUrl(photoUrl)" />
        <p class="text" :class="sender ? 'sender-color message-sender' : 'recepient-color message-recepient'">
          <slot />
        </p> 
        <!----fix от кого и к кому приходит сбщ  !--->
      </div>
      <p class="time"> {{ createdAt }} </p> 

  </div>
</template>

<script>
export default {
  props: {
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false },
    createdAt: { type: String, default: '' }
  },
  data() {
    return {
    }
  },
  methods: {
    deleteMsg() {
      console.log(this.sender);
    }
  },
  setup() {
    const getImageUrl = (name) => {
      return new URL(`${name}`, import.meta.url).href
    }


    return { getImageUrl }
  }

}
</script>

<style scoped>
.sender-color {
  background-color: #e3effd !important;
}

.recepient-color {
  background-color: #f6f6f6 !important;
}
.message-sender{ 
 margin-right:0  !important  ; 
 margin-left: 500px !important;
 
}
.message-recepient{
  margin-left:0 !important  ; 
}
.message-sender .message{ 
  width: 500px !important;
}
*, *,
*::before,
*::after { 
  box-sizing: content-box !important;
}

</style>
