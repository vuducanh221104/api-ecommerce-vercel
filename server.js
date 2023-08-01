const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
var cors = require('cors');
const db = require('./Config/db');
const routes = require('./routes');
const methodOverride = require('method-override');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

const socketIo = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

socketIo.on('connection', (socket) => {
    ///Handle khi có connect từ client tới
    console.log('New client connected' + socket.id);

    socket.on('sendDataClient', function (data) {
        console.log(data);
        // Handle khi có sự kiện tên là sendDataClient từ phía client
        socketIo.emit('sendDataServer', { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected'); // Khi client disconnect thì log ra terminal.
    });
});

// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// MiddleWare Port (Cors)
app.use(cors({ origin: true, credentials: true }));
// Call API

db.connect();

routes(app);
//app
server.listen(port, () => {
    console.log(`SERVER OK on :http//localhost:${port}`);
});
