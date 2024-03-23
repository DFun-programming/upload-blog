// Importing necessary modules and packages
const path = require('path')
const express = require("express");

const cors = require("cors");
const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.router');
const userRouter = require('./routes/user.route');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { dbConnect } = require("./config/database");

// Creating an Express application instance
const app = express();
// Loading environment variables from .env file
dotenv.config();

// Setting up port number
const PORT = process.env.PORT ;

//set dirname
__dirname = path.resolve();

// Connecting to database
dbConnect();
 
// Middleware setup

// Parse JSON bodies of incoming requests
app.use(express.json());

// Parse cookies attached to incoming requests
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS) for all origins with credentials support
app.use(
	cors({
		origin: "http://localhost:5173", // Allow requests from any origin
		credentials: true, // Allow cookies and authorization headers
	})
);

// Routing setup

// Routing for authentication-related endpoints
app.use('/api/v1/auth', authRouter);

// Routing for post-related endpoints
app.use('/api/v1/post', postRouter);

// Routing for comment-related endpoints
app.use('/api/v1/comment', commentRouter);

// Routing for user-related endpoints
app.use('/api/v1/user', userRouter);

app.use(express.static(path.join(__dirname,'/react-client/dist')));


app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'react-client','dist','index.html'));
})

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
