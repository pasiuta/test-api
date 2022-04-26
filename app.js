const express = require("express");
const userRouter = require("./routes/user_routes");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json())

app.use('/api',userRouter);
app.listen(PORT,()=> console.log(`server started on post ${PORT}`))