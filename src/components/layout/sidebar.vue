<template>
  <aside class="flex-item left-sidebar">
    <sidebar-profile
      :is-main-profile="true"
      :profile-image="userService.getUserIcon()"
      :username="userService.getUserProfileData().full_name"
      status="online"></sidebar-profile>
    <search v-on:filtered-results="filterUsers"></search>
    <h3>
      Contacts
      <span
        class="add-group"
        v-on:click="createRoom">
        <i class="fas fa-users"></i>
      </span>
      <input
        type="text"
        class="room-field"
        placeholder="Create New Room"
        v-show="showRoomField"
        v-on:keydown.enter="saveRoom"
        v-model="roomName"
        ref="roomField"/>
    </h3>
    <div class="contacts">
      <!-- Rooms -->
      <ul class="user-rooms">
        <li
          v-for="(room, index) in rooms"
          :key="index"
          v-on:click="selectRoom(room)">
          <i class="fas fa-users"></i>
          <span>{{room.roomName}}</span>
        </li>
      </ul>
      <sidebar-profile v-for="user in getAllUsers(users)" :key="user.id"
                       v-on:profile-clicked="selectUser"
                       :username="user.username"
                       :profile-image="user.profile_image"
                       :id="user.id"
                       :status="getUserStatus(user.id)"></sidebar-profile>
    </div>
  </aside>
</template>

<script>
  import SidebarProfile from '../chat/sidebar-profile';
  import Search from '../chat/search';
  import UserService from '../../services/user-service';
  import RequestService from '../../services/request-service';

  export default {
    name: "sidebar",
    data() {
      return {
        showRoomField: false,
        roomName: '',
        userService: UserService,
        allUsers: []
      };
    },
    created() {
      this.userService.getUserRooms();
    },
    computed: {
      users() {
        return this.$store.state.allUsers;
      },
      rooms() {
        return this.$store.state.userRooms;
      },
      connectedUsers() {
        return this.$store.state.connectedUserIds;
      },
    },
    methods: {
      filterUsers(filtered) {
        this.allUsers = filtered;
      },
      getAllUsers(users) {
        if (this.allUsers.length > 0) {
          return this.allUsers;
        }
        return users;
      },
      selectUser(user) {
        this.$store.commit('setSelectedUser', {
          title: user.title,
          type: user.type,
          icon: user.icon,
          userId: user.userId
        });
      },
      createRoom() {
        this.showRoomField = true;
        this.$nextTick(() => {
          this.$refs.roomField.focus();
        });
      },
      saveRoom() {
        if (this.roomName === '') {
          this.showRoomField = false;
          this.$refs.roomField.blur();
          return;
        }
        RequestService.axios.post('/create-room', {
          roomName: this.roomName,
          userId: this.userService.getUserProfileData().id
        })
          .then((resp) => {

            this.$chat.socket.emit('room-created', {
              roomName: this.roomName,
              userId: this.userService.getUserProfileData().id
            });
            this.showRoomField = false;
            this.roomName = "";
          })
          .catch((error) => {
            console.log(error);
          });
      },
      selectRoom(room) {
        this.$store.commit('setSelectedUser', {
          title: room.roomName,
          icon: '<i class="fas fa-users"></i>',
          type: 'group'
        });
      },
      getUserStatus(userId) {
        if (typeof this.$store.state.connectedUserIds[userId] !== 'undefined') {
          return this.$store.state.connectedUserIds[userId];
        }
        return 'offline';
      }
    },
    components: {
      SidebarProfile,
      Search
    }
  }
</script>

<style scoped>
  aside.left-sidebar {
    background: #f0f4f8;
    border-right: 1px #d8e5ef solid;
    flex: 0 0 248px;
    overflow: hidden;
  }

  div.contacts {
    height: calc(100% - 18px - 72px - 70px - 30px);
    overflow: auto;
  }

  h3 {
    margin: 0 15px 15px 15px;
    padding: 0 0 15px 0;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 13px;
    border-bottom: 1px #d8e5ef solid;
    position: relative;
  }

  span.add-group {
    float: right;
    font-size: 22px;
    display: block;
    -webkit-transform: translateY(-5px);
    -moz-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    -o-transform: translateY(-5px);
    transform: translateY(-5px);
    cursor: pointer;
    color: #077db4;
  }

  input.room-field {
    position: absolute;
    width: 100%;
    left: 0;
    top: -8px;
    height: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 5px;
    border: 1px #f9fafb solid;
    outline: none;
    -webkit-box-shadow: 0px 0px 31px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 31px -8px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 31px -8px rgba(0, 0, 0, 0.75);
  }

  ul.user-rooms {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul.user-rooms li {
    display: block;
    padding: 7px 15px;
    cursor: pointer;
  }

  ul.user-rooms li i {
    font-size: 30px;
    color: #006bdf;
    margin-right: 17px;
    display: inline-block;
  }

  ul.user-rooms li span {
    margin: 1em;
    -webkit-transform: translateY(-5px);
    -moz-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    -o-transform: translateY(-5px);
    transform: translateY(-5px);
    font-size: 12px;
    display: inline-block;
  }
</style>