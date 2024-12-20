import { createRouter, createWebHistory } from "vue-router";
import messages from "../views/Messages.vue";
import login from "../views/Login.vue";

import signup from "../views/Signup.vue";
import settings from "../views/Settings.vue";
const routes = [{
        path: "/messages",
        name: "Messages",
        component: messages,
    },
    {
        path: "/login",
        name: "Login",
        component: login,
    },
    {
        path: "/signup",
        name: "Signup",
        component: signup,
    },
    {
        path: "/settings",
        name: "Settings",
        component: settings,
    },
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});

export default router;