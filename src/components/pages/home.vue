<template>
  <div class="content-area">
    <top-header></top-header>
    <main class="container">
      <sidebar></sidebar>
      <main-content></main-content>
    </main>
  </div>
</template>

<script>
  import TopHeader from '../../components/layout/top-header';
  import Sidebar from '../../components/layout/sidebar';
  import MainContent from '../../components/layout/main-content';
  import UserService from '../../services/user-service';

  export default {
    name: "home",
    beforeRouteEnter(to, from, next) {
      if (!UserService.userLoggedIn()) {
        next('/login');
        return;
      }
      next();
    },
    created() {
      UserService.getAllUsers();
    },
    components: {
      TopHeader,
      Sidebar,
      MainContent
    }
  }
</script>

<style scoped>
  main.container {
    display: flex;
    flex-direction: row;
    height: calc(100% - 46px) !important;
    overflow: hidden !important;
  }
</style>