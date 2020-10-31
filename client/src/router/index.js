import Vue from "vue";
import VueRouter from "vue-router";
// import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import NewPost from "../views/NewPost.vue";
import Posts from "../views/Posts.vue";
import Post from "../views/Post.vue";
import Edit from "../views/EditPost.vue";
import Settings from "../views/Settings.vue";
import AllPosts from "../views/AllPosts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/newpost",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/posts",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Register,
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/posts/:siteTitle",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/post",
    name: "Post",
    component: Post,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
