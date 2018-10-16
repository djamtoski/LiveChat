<template>
  <header class="main-header">
    <router-link
      to="/" class="logo">
      <i class="fab fa-pied-piper"></i>
      <span>
        sedc chat - {{userService.getUserProfileData().full_name}}
        <strong v-if="loggedIn">( Online {{onlineUsers}} users )</strong>
      </span>
    </router-link>
    <ul class="main-menu">
      <template v-if="!loggedIn">
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
      </template>
      <li v-if="loggedIn"><a v-on:click="signOut">Sign Out</a></li>
    </ul>
  </header>
</template>

<script>
  import UserService from '../../services/user-service';

  export default {
    name: 'TopHeader',
    data() {
      return {
        userService: UserService
      }
    },
    computed: {
      loggedIn() {
        return UserService.userLoggedIn();
      },
      onlineUsers() {
        return this.$store.state.onlineUsers;
      }
    },
    methods: {
      signOut() {
        UserService.signOut();
        this.$router.replace('/login');
      }
    }
  }
</script>

<style scoped>
  header.main-header {
    width: 100%;
    height: 45px;
    border-bottom: 1px #bad7ee solid;
    line-height: 45px;
    display: flex;
    align-content: center;
  }

  header.main-header a.logo {
    height: 45px;
    display: inline-block;
    color: #019fd9;
    font-weight: 300;
    line-height: 45px;
    text-decoration: none;
  }

  header.main-header a.logo span {
    display: block;
    float: left;
    font-size: 11px;
    font-weight: 400;
  }

  header.main-header a.logo span strong {
    color: #37be18;
  }

  header.main-header h3 {
    color: #019fd9;
    max-width: 350px;
    width: 50%;
    margin: auto;
  }

  header.main-header a.logo i {
    font-size: 36px;
    color: #019fd9;
    float: left;
    margin: 3px 10px 0 10px;
  }

  ul.main-menu {
    list-style: none;
    margin: 0 15px 0 auto;
    padding: 0;
  }

  ul.main-menu li {
    display: block;
    float: left;
    font-size: 12px;
    margin: 0 0 0 10px;
  }

  ul.main-menu li a {
    display: block;
    text-decoration: none;
    color: #0b7db4;
  }
</style>