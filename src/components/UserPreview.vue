<template>
    <div class="d-flex justify-content-start discussion"  @click="changeUser">
        <img class="photo " :src="getImageUrl(photoUrl)" />

        <div class="desc-contact">
            <p class="name">{{ name }}</p>
        </div> 
    </div>
</template>
<script>
export default {
    methods: {
        addUser() {
            console.log(this.email);
        },
        changeUser() {
            this.$store.state.userName = this.name;
            this.$store.state.userEmail = this.email;
            this.$store.state.avatar = this.photoUrl;
            console.log(this.$store.state.avatar); 
            this.$emit('changeUser');
        }
    },
    props: {
        photoUrl: { type: String, default: '' },
        name: { type: String, default: '' },
        email: { type: String, default: '' }
    },

    setup() {
        const getImageUrl = (name) => {
            return new URL(`${name}`, import.meta.url).href
        }
        return { getImageUrl }
    }

}
</script>
