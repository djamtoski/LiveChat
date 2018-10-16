const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const helper = require('./lib/helper');
const routes = require('./lib/api');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
require('./lib/socket-io')(io);

/**
 * Enable session
 */
app.use(session({
  secret: 'sedc chat 2018',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));
/**
 * Enable cors requests
 */
app.use(cors());
/**
 * Activate body parser
 */
app.use(bodyParser.json());

/**
 * Base api url prefix
 */
app.use('/api/v1', routes);

app.get('/', function (req, res) {
  res.send('<h1>USER CHAT - SEDC VUE COURSE 2018</h1>');
});
http.listen(3000, function () {
  helper.createChatLogsDir();
  console.log('listening on *:3000');
});