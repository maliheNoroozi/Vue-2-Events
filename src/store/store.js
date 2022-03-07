import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'
import * as events from '@/store/modules/events'
import * as notifications from '@/store/modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    events,
    notifications,
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  mutations: {},
  actions: {},
  getters: {},
})
