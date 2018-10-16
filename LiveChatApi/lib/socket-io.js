const db = require('./db');
let users = {};

const socketIo = (io) => {
  /**
   * Connect to socket
   */
  io.on('connect', (socket) => {
    /**
     * Set user data
     * @type {{ssid: *, email: string, id: *, username: (string|default.props.username|{type, default}|string)}}
     */
    users[socket.handshake.query.id] = {
      ssid: socket.handshake.query.ssid,
      email: socket.handshake.query.email,
      socketId: socket.id,
      username: socket.handshake.query.username,
    };
    notifyConnectedUsers(socket);

    console.log(`User ${users[getUserId(socket.id)].username} has connected to server`);

    /**
     * Emit total number of connected users
     */
    io.emit('online-users', Object.keys(users).length);

    /**
     * Track when user will be disconnected, when he is signing out.
     */
    socket.on('disconnect-user', () => {
      socket.disconnect();
    });

    /**
     * User connected to socket
     */
    socket.on('connect', () => {
      if (typeof users[getUserId(socket.id)] !== 'undefined') {
        socket.broadcast.emit('user-connected', getUserId(socket.id));
        console.log(`User ${users[getUserId(socket.id)].username} has connected to server`);
      }
      socket.emit('online-users', Object.keys(users).length);
    });

    /**
     * User disconnected from socket
     */
    socket.on('disconnect', () => {
      if (typeof users[socket.id] !== 'undefined') {
        socket.emit('user-disconnected', users[socket.id].id);
        console.log(`User ${users[socket.id].username} has disconnected from server`);
        delete users[socket.id];
      }
      io.emit('online-users', Object.keys(users).length);
    });

    /**
     * Create room
     */
    socket.on('room-created', data => {
      socket.join(data.roomName);
      io.emit('room-created', data);
    });

    /**
     * Message received
     */
    socket.on('chat-message', msg => {
      let socketId = getUserSocketId(msg.receiverId);
      if (socketId) {
        if (msg.userType === 'user') {
          console.log('AAA', msg);
          socket.broadcast.to(socketId).emit('chat-message', {
            message: msg.message,
            type: 'o-msg',
            senderId: msg.senderId,
            receiverId: msg.receiverId
          });
        } else {
          // group logic here
          socket.join(msg.name);
          socket.broadcast.to(msg.name).emit('chat-message', {
            message: msg.message,
            type: 'o-msg',
            senderId: msg.senderId,
            receiverId: msg.receiverId
          });
        }
      }
    });
  });
};

/**
 * Get socket id for connected user
 * @param userId
 * @returns {*}
 */
const getUserSocketId = (userId) => {
  for (let id in users) {
    if (Number.parseInt(id, 10) === Number.parseInt(userId, 10)) {
      return users[id].socketId;
    }
  }
  return false;
};
/**
 *
 * @param socketId
 */
const getUserId = (socketId) => {
  for (let id in users) {
    if (users[id].socketId === socketId) {
      return id;
    }
  }
  return false;
};
/**
 * Get connected users
 */
const notifyConnectedUsers = (socket) => {
  for (let id in users) {
    socket.emit('user-connected', Number.parseInt(id, 10));
  }
};
module.exports = socketIo;