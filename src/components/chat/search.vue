<template>
  <div class="search-users">
    <i class="fas fa-search"></i>
    <input type="search" placeholder="Search..."
           v-model="username"
           @keyup="filterUsers"/>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        username: '',

      }
    },
    methods: {
      filterUsers() {
        let allUsers = this.$store.state.allUsers;
        let filteredUsers = allUsers.filter((user) => {
          return user.username.includes(this.username);
        });
        this.$emit('filtered-results', filteredUsers.slice(0));
      }
    }
  }
</script>

<style scoped>
  div.search-users {
    padding: 15px;
  }

  div.search-users i {
    float: left;
    width: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    border-bottom: 1px #d8e5ef solid;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #667486;
  }

  div.search-users input[type="search"] {
    width: calc(100% - 15px);
    background: transparent;
    border: none;
    border-bottom: 1px #d8e5ef solid;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 5px;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 400;
    font-family: 'Open Sans', sans-serif;
    color: #667486;
    outline: 0 !important;
  }
</style>