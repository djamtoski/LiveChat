import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onlineUsers: 0,
    connectedUserIds: [],
    allUsers: [],
    userRooms: [],
    selectedUser: {},
    messages: [],
  },
  mutations: {
    /**
     *
     * @param state
     * @param onlineUsers
     */
    trackOnlineUsers(state, onlineUsers) {
      state.onlineUsers = onlineUsers;
    },
    /**
     *
     * @param state
     * @param payload
     */
    addConnectedUser(state, payload) {
      state.connectedUserIds[payload.id] = payload.status;
    },
    /**
     *
     * @param state
     * @param users
     */
    setUsers(state, users) {
      state.allUsers = users;
    },
    /**
     *
     * @param state
     * @param rooms
     */
    setRooms(state, rooms) {
      state.userRooms = rooms;
    },
    /**
     *
     * @param state
     * @param room
     */
    addRoom(state, room) {
      state.userRooms.push(room);
    },
    /**
     *
     * @param state
     * @param data
     */
    setSelectedUser(state, data) {
      state.selectedUser = data;
    },
    /**
     *
     * @param state
     * @param msg
     */
    addMessage(state, msg) {
      state.messages.push(msg);
    }
  },
  actions: {},
  getters: {}
});