// Importing required modules
const jwt = require("jsonwebtoken"); // Library for JSON Web Tokens
const dotenv = require("dotenv"); // Library for loading environment variables
const User = require("../models/User"); // Importing User model for database operations

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Getting JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware function to handle errors
exports.isError = (err, req, res, next) => {
  // Setting status code for the response, defaulting to 500 if not provided
  const statusCode = err.statusCode || 500;
  // Setting error message for the response, defaulting to "Internal Server Error" if not provided
  const message = err.message || "Internal Server Error";
  // Sending JSON response with error details
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
exports.isAuth=async(req,res,next)=>{
  try {
    // Extracting JWT from request cookies, or header
		const token =req.cookies.access_token
		console.log("token : ",token);
		// || req.header("Authorization").replace("Bearer ", "");
    
    console.log(token)
		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
}