<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar'
import { mapState } from 'vuex'

export default {
  components: { NotificationBar },
  computed: mapState('notifications', ['notifications']),
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
}
</style>
