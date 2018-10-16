const fs = require('fs');
const path = require('path');
/**
 * Helper object
 * @type {{userDirPath: (function(): *), dirExists: helper.dirExists, createChatLogsDir: helper.createChatLogsDir}}
 */
const helper = {
  /**
   * Get user directory cross platform
   * @returns {*}
   */
  userDirPath: () => process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
  /**
   * Check if certain directory exists
   */
  dirExists: (dir, callback) => {
    fs.stat(dir, (err, stats) => {
      if (err && err.errno === 34) {
        callback(false);
      } else {
        callback(true);
      }
    });
  },
  /**
   * Create chat logs directory
   */
  createChatLogsDir: () => {
    fs.mkdir(path.join(helper.userDirPath(), 'sedc-chat-history'), () => {

    });
  }
};

module.exports = helper;