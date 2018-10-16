import io from 'socket.io-client';
import store from '../store';

export default class ChatService {
  /**
   * Class constructor  method
   */
  constructor(apiUrl) {
    /**
     * Socket IO instance
     */
    this.socket = null;
    /**
     * Api URL
     */
    this.apiUrl = apiUrl;
  }

  /**
   * Establish socket connection
   * @param userData
   */
  connect(userData) {
    console.log('connecting: ', userData);
    this.socket = io(this.apiUrl, {
      query: {
        ssid: userData.SSID,
        email: userData.email,
        id: userData.id,
        username: userData.username,
      }
    });
    /**
     * Keep track of online users
     */
    this.socket.on('online-users', (data) => {
      store.commit('trackOnlineUsers', data);
    });
    /**
     * Add connected user to list of users
     */
    this.socket.on('user-connected', (data) => {
      store.commit('addConnectedUser', {id: data, status: 'online'});
    });

    /**
     * Set user in offline mode
     */
    this.socket.on('user-disconnected', (data) => {
      store.commit('addConnectedUser', {id: Number.parseInt(data, 10), status: 'offline'});
    });

    /**
     * Add new room
     */
    this.socket.on('room-created', (data) => {
      store.commit('addRoom', data);
    });
    /**
     * New message received
     */
    this.socket.on('chat-message', msg => {
      console.log('MESSAGE: ', msg);
      store.commit('addMessage', {
        message: msg.message,
        senderId: msg.senderId,
        type: msg.type,
        receiverId: msg.receiverId
      });
    });
  }
}