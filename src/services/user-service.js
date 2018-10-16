import Vue from 'vue';
import store from '../store';
import RequestService from './request-service';

export default class UserService {
  /**
   * Check if user is logged in
   * @returns {string | boolean}
   */
  static userLoggedIn() {
    const userData = localStorage.getItem('user');
    const ssid = localStorage.getItem('ssid');
    return ssid && userData;
  }

  /**
   * Sign out
   */
  static signOut() {
    localStorage.removeItem('ssid');
    localStorage.removeItem('user');
    Vue.prototype.$chat.socket.emit('disconnect-user');
  }

  /**
   * Get user profile icon
   */
  static getUserIcon() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).profile_image;
    }
    return '';
  }

  /**
   * Get all user info
   * @returns {*}
   */
  static getUserProfileData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return {};
  }

  /**
   * Get all users
   */
  static getAllUsers() {
    RequestService.axios.post('/all', {
      cid: this.getUserProfileData().id
    })
      .then((resp) => {
        store.commit('setUsers', resp.data.map(user => {
          user.status = 'offline';
          return user;
        }));

      })
      .catch((err) => {

      });
  }

  static getUserRooms() {
    RequestService.axios.get('/get-all-rooms')
      .then((resp) => {
        console.log(resp.data);
        const rooms = resp.data.map(room => {
          return {
            roomName: room.room_name,
            userId: room.id,
            created: room.created_at
          };
        });
        store.commit('setRooms', rooms);
      })
      .catch((err) => {

      });
  }
}