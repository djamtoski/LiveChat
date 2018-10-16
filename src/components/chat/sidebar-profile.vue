<template>
  <div :class="[
  'sidebar-profile',
  {'selected-user': selectedUser.userId === id },
  {'main-user-profile': isMainProfile}
  ]" v-on:click="selectProfile">
    <figure>

      <div class="fig-image" :style="{width: width, height: width}">
        <img :src="profileImage" class="profile-img" :style="{width: width}"/>
        <div v-show="!onlyImage" :class="[
        'online-status',
        {'online': status === 'online'},
        {'offline': status === 'offline'}]">
          <i class="far fa-circle" v-show="status === 'offline'"></i>
          <i class="fas fa-check-circle" v-show="status === 'online'"></i>
        </div>
      </div>

      <figcaption v-show="!onlyImage">
        <h3 :class="{'title-pad': !isMainProfile}">{{username}}</h3>
        <span v-if="isMainProfile">{{status}}</span>
      </figcaption>
    </figure>
  </div>
</template>

<script>


  export default {
    name: "sidebar-profile",
    data() {
      return {
        isSelected: false,
      }
    },
    computed: {
      selectedUser() {
        return this.$store.state.selectedUser;
      }
    },
    props: {
      status: {
        type: String,
        default: 'offline'
      },
      username: {
        type: String,
        default: "Anna O'connel",
      },
      id: {
        type: Number,
        default: 0,
      },
      isMainProfile: {
        type: Boolean,
        default: false,
      },
      onlyImage: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
        default: '40px',
      },
      profileImage: {
        type: String,
        default: '/images/profile-img.jpg'
      }
    },
    methods: {
      selectProfile() {
        this.$emit('profile-clicked', {
          icon: this.profileImage,
          type: 'user',
          title: this.username,
          userId: this.id
        });
      }
    }
  }
</script>

<style scoped>
  div.sidebar-profile {
    padding: 7px 15px;
  }

  div.sidebar-profile.main-user-profile {
    padding: 15px;
  }

  div.sidebar-profile figure {
    display: flex;
    margin: 0;
    padding: 0;
  }

  div.fig-image {
    width: 40px;
    height: 40px;
    max-width: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: relative;
    border: 1px #b8cce1 solid;
    margin-right: 15px;
  }

  figcaption h3, figcaption span {
    font-weight: 400;
    font-size: 12px;
  }

  figcaption h3 {
    padding: 0;
    margin: 0 0 5px 0;
  }

  figcaption h3.title-pad {
    margin: 1em;
  }

  img.profile-img {
    max-width: 100%;
    height: auto;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  div.online-status {
    width: 16px;
    height: 16px;
    border: 1px #fff solid;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    right: -4px;
    bottom: -4px;
  }

  div.online-status i {
    color: #7fba00;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  div.online-status.offline {
    background: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .user-selected {
    background: #c7edfc;
  }

  .selected-user {
    background: #2f90ee;
    color: #fff;
    cursor: pointer;
  }
</style>