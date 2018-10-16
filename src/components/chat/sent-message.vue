<template>
  <div class="sent-msg">
    <div class="profile-img" v-show="msgType === 'o-msg'">
      <sidebar-profile :only-image="true" width="30px"></sidebar-profile>
    </div>
    <div :class="['msg', msgType]">
      <span class="arrow"></span>
      <div :class="['s-message', msgType]" v-html="msg">
      </div>
    </div>
    <div class="msg-time">
      <span>12:03 PM</span>
    </div>
  </div>
</template>

<script>
  import SidebarProfile from './sidebar-profile';

  export default {
    name: "sent-message",
    data() {
      return {};
    },
    props: {
      msgType: {
        type: String,
        default: 'my-msg'
      },
      msg: {
        type: String
      },
    },
    components: {
      SidebarProfile,
    }
  }
</script>

<style scoped>
  div.sent-msg {
    position: relative;
    display: flex;
    margin: 0 0 20px 0;
  }

  div.sent-msg div.profile-img {
    flex: 0 0 40px;
  }

  div.sent-msg div.msg-time {
    flex: 0 0 70px;
    font-size: 11px;
    color: #667486;
    text-align: right;
  }

  div.sent-msg div.msg-time span {
    display: block;
    padding-right: 8px;
    padding-top: 11px;
  }

  div.sent-msg div.profile-img div.sidebar-profile {
    margin: 0 !important;
    padding: 0 !important;
  }

  div.sent-msg div.profile-img div.sidebar-profile figure div.fig-image img.profile-img {
    max-width: 10px !important;
    height: auto !important;
    display: none !important;
  }

  div.sent-msg div.s-message {
    max-width: 100%;
    padding: 10px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 13px;
  }

  div.msg {
    position: relative;
    flex: 1 1 auto;
  }

  div.msg span.arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    top: 10px;
  }

  div.sent-msg div.s-message.my-msg {
    background: #c7edfc;
    margin-left: 80px;
  }

  div.sent-msg div.s-message.o-msg {
    background: #f0f4f8;
    margin-right: 80px;
  }

  div.msg.my-msg span.arrow {
    right: -10px;
    border-width: 8px 0 8px 10px !important;
    border-color: transparent transparent transparent #c7edfc;
  }

  div.msg.o-msg span.arrow {
    left: -10px;
    border-width: 8px 10px 8px 0;
    border-color: transparent #f0f4f8 transparent transparent;
  }
</style>