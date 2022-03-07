<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in events.events" :key="event.id" :event="event" />
    <router-link
      v-if="page > 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
    >
      Previous Page |
    </router-link>
    <router-link
      v-if="events.eventsTotalCount > page * 3"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },
  computed: {
    ...mapState(['events', 'user']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page,
    })
  },
}
</script>
