<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import TopHeader from './components/layout/top-header';
  import Sidebar from './components/layout/sidebar';
  import MainContent from './components/layout/main-content';
  import UserService from './services/user-service';

  export default {
    name: 'app',
    created() {
      if (UserService.userLoggedIn()) {
        this.$chat.connect(UserService.getUserProfileData());
      }
      UserService.getAllUsers();
    },
    components: {
      TopHeader,
      Sidebar,
      MainContent
    }
  }
</script>

<style>
  #app, div.content-area {
    height: 100%;
  }
</style>
