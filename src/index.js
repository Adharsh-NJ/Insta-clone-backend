const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connect } = require('./services/dbConnect.js');

//routes
const userRoute = require('./routes/users.js');
const postRoute = require('./routes/posts.js');
const commentsRoute = require('./routes/comments.js');
const followerRoute = require('./routes/followers.js');
const followingRoute = require('./routes/following.js');
const likeRoute = require('./routes/likes.js');
const authRoute = require('./routes/auth.js');

const app = express();
dotenv.config()

//middleware
app.use(fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
}));

app.use(express.json());
app.use(cors());

app.use('/api/users/', userRoute);
app.use('/api/posts/', postRoute);
app.use('/api/comments/', commentsRoute);
app.use('/api/followers/', followerRoute);
app.use('/api/following/', followingRoute);
app.use('/api/likes/', likeRoute);
app.use('/api/auth/', authRoute);

//to handle errors
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
})