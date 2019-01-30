<template>
  <div class="home">
    <h1>Twilite</h1>
    <div id="app">
        <router-link :to="{ path: 'home'}">Home</router-link>
        <router-link :to="{ path: 'simple'}">Simple</router-link>
        <router-view></router-view>
    </div>
  </div>
</template>
<script src="lib/vue.js"></script>
<script src="lib/vue-router.js"></script>
<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  Vue.use( VueRouter );

    var HomePageComponent = {
        template: '<h2>Home Page</h2>'
    }

    var SimpleComponent = {
        template: '<h2>Simple Page</h2>'
    }

    const routes = [
        { path: '/home', name: 'home', component: HomePageComponent },
        { path: '/simple', name: 'simple', component: SimpleComponent }
    ]

    const router = new VueRouter({
        routes // short for `routes: routes`
    })

    var app = new Vue({
        components: {
            'HomePageComponent': HomePageComponent,
            'SimpleComponent': SimpleComponent
        },
        router
    }).$mount('#app')
</script>
<style scoped>
</style>
