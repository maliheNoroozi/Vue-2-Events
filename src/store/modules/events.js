import EventService from '@/services/EventService.js'

export const state = {
  events: [],
  event: {},
  eventsTotalCount: 0,
}

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENTS_TOTAL_COUNT(state, totalCount) {
    state.eventsTotalCount = totalCount
  },
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: `Your event has been created successfully`,
        }
        dispatch('notifications/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem creating your event: ${error.message}`,
        }
        dispatch('notifications/add', notification, { root: true })
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents({ perPage, page })
      .then((response) => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL_COUNT', response.headers['x-total-count'])
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching event: ${error.message}`,
        }
        dispatch('notifications/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching events: ${error.message}`,
          }
          dispatch('notifications/add', notification, { root: true })
        })
    }
  },
}
