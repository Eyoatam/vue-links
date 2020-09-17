import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyD3BbbVj7mWhtXr6ZCAqqcgw9DTag1mTQo",
  authDomain: "vue-linktree.firebaseapp.com",
  databaseURL: "https://vue-linktree.firebaseio.com",
  projectId: "vue-linktree",
  storageBucket: "vue-linktree.appspot.com",
  messagingSenderId: "891284787546",
  appId: "1:891284787546:web:74bd6d42dc142a348e6363",
});

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
