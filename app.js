require('dotenv').config();
const express = require("express");
const userRouter = require("./routes/user");
const PORT = process.env.APP_PORT || 8081;
const app = express();
app.use(express.json())
const io = require("socket.io")(process.env.SOCKET_PORT, {
    cors: {
        origin: [process.env.SOCKET_CORS],
    }
})
io.on("connection", socket => {
    socket.on("userUpdated", (user) => {
        console.log('message from socket');
        console.log(user);

    })
})
app.use('/api', userRouter);
app.listen(PORT, () => console.log(`server started on post ${PORT}`))

