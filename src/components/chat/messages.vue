<template>
  <div class="message-container">
    <div class="group-header">
      <div class="icon" v-html="headerData.icon" v-if="headerData.type === 'group'"></div>
      <div class="icon" v-if="headerData.type === 'user'">
        <img :src="headerData.icon" class="profile-img" :style="{width: '60px'}"/>
      </div>
      <h2>{{headerData.title}}</h2>
    </div>
    <div class="sent-messages">
      <sent-message
      v-for="(msg, index) in messages"
      :key="index"
      :msg-type="msg.type"
      :msg="msg.message"
    ></sent-message>
    </div>
    <post-message
      :data="headerData"
      @send-message="sendMessage"></post-message>
  </div>
</template>

<script>
  import PostMessage from './post-message';
  import SentMessage from './sent-message';
  import UserService from '../../services/user-service';

  export default {
    name: "messages",
    data() {
      return {}
    },
    computed: {
      headerData() {
        return this.$store.state.selectedUser;
      },
      messages() {
        return this.$store.state.messages;
      }
    },
    methods: {
      sendMessage(msg) {
        this.$store.commit('addMessage', {
          message: msg.message,
          senderId: UserService.getUserProfileData().id,
          type: 'my-msg',
          receiverId: this.headerData.userId
        });

        this.$chat.socket.emit('chat-message', {
          message: msg.message,
          userType: this.headerData.type,
          name: this.headerData.title,
          senderId: UserService.getUserProfileData().id,
          receiverId: this.headerData.userId
        });
      }
    },
    components: {
      PostMessage,
      SentMessage
    }
  }
</script>

<style scoped>
  div.message-container {
    height: 100%;
    position: relative;
  }

  div.sent-messages {
    width: 100%;
    max-width: 700px;
    min-height: 20px;
    max-height: calc(100% - 120px);
    overflow: auto;
    position: absolute;
    left: 50%;
    bottom: 100px;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  div.group-header {
    width: 100%;
    height: 80px;
    border-bottom: 1px #d8e5ef solid;
    background: rgba(255, 255, 255, 0.92);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }

  div.group-header div.icon {
    float: left;
    height: 80px;
    line-height: 80px;
    font-size: 40px;
    color: #006bdf;
    margin: 0 17px;
  }

  div.group-header div.icon img {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px #006bdf solid;
    margin-top: 10px;
  }

  div.group-header h2 {
    float: left;
    height: 80px;
    line-height: 80px;
    font-size: 18px;
    font-weight: 600;
    padding: 0;
    margin: 0;
  }
</style>