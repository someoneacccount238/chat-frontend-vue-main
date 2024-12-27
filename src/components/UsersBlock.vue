<template>

    <section class="discussions">
        <div class="discussion search">
            <div class="searchbar">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Search..." />
            </div> 
        </div>
        <UserPreview v-for="{ user_id, avatar, user_name, user_email } in users" :key="user_id" :photo-url="avatar"
            :name="user_name" :email="user_email" v-on:changeUser="changeUser" />

    </section>
</template>
<script>
import { reactive, onMounted } from 'vue';

import UserPreview from './UserPreview.vue'

export default {
    components: { UserPreview },
    methods: { 
        changeUser() {
            this.$emit('changeUser');
        }
    },
    setup() {
        const users = reactive([])

        onMounted(async () => {
            await fetch('http://localhost/chat-app-backend/api/get_users.php', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }

            })
                .then(r => r.json()).then((res) => {

                    var dataObj = JSON.parse(res.message);

                    for (var i in dataObj)
                        users.push(dataObj[i]);

                    success = true

                })
                .catch((error) => {
                    //error = error.data 
                }
                )
        })
        return { users }
    }
};
</script>
<style scoped>
.discussions {
    width: 400px;
    position: absolute;
    left: 0 !important;
    overflow-y: scroll;
    height: auto;
    font-size: 11pt;

}
</style>