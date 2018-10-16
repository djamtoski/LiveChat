<template>
  <div class="message-box">
    <div class="area">
        <textarea
          class="message-area"
          v-model="message"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          v-on:keyup.enter.prevent="sendMessage($event)"
          spellcheck="false"></textarea>
    </div>
    <div class="buttons">
        <span class="send-message"
              v-on:click="sendMessage">
          <i class="fas fa-location-arrow"></i>
        </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "post-message",
    data() {
      return {
        message: '',
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      sendMessage(e) {
        if (e.shiftKey) {
          console.log('gfdgdgd');
          return;
        }
        this.$emit('send-message', {
          message: this.message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
          type: 'my-msg'
        });
        this.message = "";
      }
    }
  }
</script>

<style scoped>
  div.message-box {
    height: 70px;
    width: 100%;
    max-width: 700px;
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 0;
    border-top: 1px #077db4 solid;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  div.message-box .area {
    flex: 1;
  }

  div.message-box .area textarea.message-area {
    min-height: 50px;
    width: 100%;
    max-width: 100%;
    border: none;
    outline: 0 !important;
    padding: 0;
    margin-top: 15px;
    resize: none !important;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    line-height: 1.5em;
  }

  div.message-box div.buttons {
    flex: 0 0 80px;
    text-align: right;
  }

  div.message-box div.buttons span.send-message {
    display: inline-block;
    margin: 15px 0 0 10px;
    padding: 8px;
    color: #fff;
    background: #077db4;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    cursor: pointer;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }

  div.message-box div.buttons span.send-message:hover {
    background: #04577e;
    color: #c7edfc;
  }
</style>