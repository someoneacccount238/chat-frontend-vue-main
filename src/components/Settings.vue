<template>

    <div class="container">
        <div class="row ">
            <div class="col-lg-12 chat text-center services__text_large mt-5">
                <div class="col-lg-12 chat__box text-center mx-auto ">

                    <!-- Account Sidebar-->
                    <div class="author-card pb-3 container-fluid">
                        <div class="author-card-cover"
                            style="background-image: url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);">
                        </div>
                        <div class="author-card-profile">
                            <div class="author-card-avatar container-upload">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="old" id='old'
                                    alt="Daniel Adams">
                                <div class="overlay">
                                    <img src="../assets/img/photo.png" class="photo" alt="Camera">

                                </div>
                            </div>
                            <div class="author-card-details">
                                <h5 class="author-card-name text-lg">Daniel Adams</h5>
                            </div> 
                            <form enctype="multipart/form-data" @submit.prevent="onSubmit" action="http://localhost/php-login-minimal-master/api/change_user_settings.php" method="POST">
                                <!-- Поле MAX_FILE_SIZE требуется указывать перед полем загрузки файла -->
                                <input type="hidden" name="MAX_FILE_SIZE" value="30000000" />
                                <!-- Название элемента input определяет название элемента в суперглобальном массиве $_FILES -->
                                Отправить файл: <input name="userfile" type="file" />
                                <input type="submit" value="Отправить файл"   />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- Profile Settings-->
        <div class="col-lg-8 pb-5 mt-5">
            <form class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-fn">Username</label>
                        <input class="form-control" type="text" id="account-fn" value="Daniel" required="">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-email">E-mail Address</label>
                        <input class="form-control" type="email" id="account-email" value="daniel.adams@example.com"
                            disabled="">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-pass">New Password</label>
                        <input class="form-control" type="password" id="account-pass">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-confirm-pass">Confirm Password</label>
                        <input class="form-control" type="password" id="account-confirm-pass">
                    </div>
                </div>
                <div class="col-12">
                    <hr class="mt-2 mb-3">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <div class="custom-control custom-checkbox d-block">
                            <input class="custom-control-input" type="checkbox" id="subscribe_me" checked="">
                        </div>
                        <button class="btn btn-style-1 btn-primary" type="button" data-toast=""
                            data-toast-position="topRight" data-toast-type="success"
                            data-toast-icon="fe-icon-check-circle" data-toast-title="Success!"
                            data-toast-message="Your profile updated successfuly.">Update Profile</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
export default {
    name: 'imageUpload',
    data() {
        return {
            previewImage: null,
            selectedFile: null
        }
    },

    methods: {
        async uploadPic(event) {


            let data = new FormData();
            data.append('name', 'my-picture');
            data.append('file', event.target.files[0]);


            await fetch('http://localhost/php-login-minimal-master/api/change_user_settings.php', {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: { avatar: data }
            })
                .then(r => r.json()).then((data) => {


                })
                .catch(function (error) {
                    alert(error);
                });


        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        selectFile() {
            this.file = this.$refs.file.files[0];



        },
        async sendFile() {

            const formData = new FormData();
            const reader = new FileReader();

            if (this.file) {
                reader.readAsDataURL(this.file);
            }
            reader.onload = (readerEvent) => {
                formData.append("image", readerEvent.target.result);
            };

            console.log(formData.get('image'));
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            try {
                await axios.post('http://localhost/php-login-minimal-master/api/change_user_settings.php', { avatar: formData })
            } catch (error) {
                console.error(error);
            }
        },
        async onUpload() {
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name);

            localStorage.getItem('email')

            await fetch('http://localhost/php-login-minimal-master/api/change_user_settings.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reactive({
                    email: localStorage.getItem('email'),
                    avatar: fd
                }))
            })
                .then(r => r.json()).then((data) => {


                })
                .catch(function (error) {
                    // alert(error);
                });


        }
    }
} 
</script>

<style scoped>
body {
    background: #eee;
}

.widget-author {
    margin-bottom: 58px;
}

.author-card {
    position: relative;
    padding-bottom: 48px;
    background-color: #fff;
    box-shadow: 0 12px 20px 1px rgba(64, 64, 64, .09);
    margin-left: -30px;
    width: 105.5%;
    margin-top: -50px;
}

.author-card .author-card-cover {
    position: relative;
    width: 100%;
    height: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.author-card .author-card-cover::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    opacity: 0.5;
}

.author-card .author-card-cover>.btn {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 0 10px;
}

.author-card .author-card-profile {
    display: table;
    position: relative;
    margin-top: -22px;
    padding-right: 15px;
    padding-bottom: 16px;
    padding-left: 20px;
    z-index: 5;
}

.author-card .author-card-profile .author-card-avatar,
.author-card .author-card-profile .author-card-details {
    display: table-cell;
    vertical-align: middle;
}

.author-card .author-card-profile .author-card-avatar {
    width: 85px;
    border-radius: 50%;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, .15);
    overflow: hidden;
}

.author-card .author-card-profile .author-card-avatar>img {
    display: block;
    width: 100%;
}

.author-card .author-card-profile .author-card-details {
    padding-top: 20px;
    padding-left: 15px;
}

.author-card .author-card-profile .author-card-name {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: bold;
}

.author-card .author-card-profile .author-card-position {
    display: block;
    color: #8c8c8c;
    font-size: 12px;
    font-weight: 600;
}

.author-card .author-card-info {
    margin-bottom: 0;
    padding: 0 25px;
    font-size: 13px;
}

.author-card .author-card-social-bar-wrap {
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
}

.author-card .author-card-social-bar-wrap .author-card-social-bar {
    display: table;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 12px 20px 1px rgba(64, 64, 64, .11);
}

.btn-style-1.btn-white {
    background-color: #fff;
}

.list-group-item i {
    display: inline-block;
    margin-top: -1px;
    margin-right: 8px;
    font-size: 1.2em;
    vertical-align: middle;
}

.mr-1,
.mx-1 {
    margin-right: .25rem !important;
}

.list-group-item.active:not(.disabled) {
    border-color: #e7e7e7;
    background: #fff;
    color: #ac32e4;
    cursor: default;
    pointer-events: none;
}

.list-group-flush:last-child .list-group-item:last-child {
    border-bottom: 0;
}

.list-group-flush .list-group-item {
    border-right: 0 !important;
    border-left: 0 !important;
}

.list-group-flush .list-group-item {
    border-right: 0;
    border-left: 0;
    border-radius: 0;
}

.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.list-group-item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: .25rem;
    border-bottom-left-radius: .25rem;
}

a.list-group-item,
.list-group-item-action {
    color: #404040;
    font-weight: 600;
}

.list-group-item {
    padding-top: 16px;
    padding-bottom: 16px;
    -webkit-transition: all .3s;
    transition: all .3s;
    border: 1px solid #e7e7e7 !important;
    border-radius: 0 !important;
    color: #404040;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    text-decoration: none;
}

.list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item.active:not(.disabled)::before {
    background-color: #ac32e4;
}

.list-group-item::before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: transparent;
    content: '';
}


/* PHOTO */

.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 85px;
    width: 85px;
    opacity: 0;
    transition: .5s ease;
    background-color: #008CBA;
    border-radius: 50%;
    background-color: rgba(92, 92, 92, 0.685);
    z-index: 2;
}

.author-card-avatar:hover .overlay {
    opacity: 1;
    cursor: pointer;
}

.photo {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}

/* UPLOAD FILE */
.uploader {
    opacity: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: -20px;
    right: 0;
    height: 85px;
    width: 85px;
    cursor: pointer;
}

.container-upload {
    position: relative
}

#image {
    z-index: 10;
}

#imgInp {
    opacity: 0;

    height: 400px;
    width: 400px;
}

#blah {

    height: 400px;
    width: 400px;
    position: absolute;
    z-index: 10;
}
</style>