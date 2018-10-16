<template>
  <section class="flex-item chat-messages">
    <messages></messages>
  </section>
</template>

<script>
  import Messages from '../chat/messages';

  export default {
    name: "main-content",
    components: {
      Messages,
    }
  }
</script>

<style scoped>
  section.chat-messages {
    flex: 1 1 auto;
  }
</style>