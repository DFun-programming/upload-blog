const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error");
require("dotenv").config();

// Controller to handle user signup
exports.signup = async (req, res, next) => {
  try {
    // Destructure fields from the request body
    const { username, firstName, lastName, email, password, confirmPassword } =
      req.body;

    // Check if all required fields are provided
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      // Return a 403 error if any required field is missing
      next(errorHandler(403, "All Fields are required"));
    }

    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters")
      );
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      next(
        errorHandler(
          400,
          "Password and Confirm Password do not match. Please try again."
        )
      );
    }
    

    // Check if the email is in valid format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return next(errorHandler(400, "Enter a valid email"));
    }

    // Check username constraints
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(
        errorHandler(400, "User already exists. Please sign in to continue.")
      );
    }

    // Check if username already exists
    const existingUserWithUsername = await User.findOne({ username });
    if (existingUserWithUsername) {
      next(
        errorHandler(400, "Username already exists. Please select different username.")
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // Return success response with user details
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    // If an error occurs during the process, handle it and return an error response
    console.error(error);
    next(errorHandler(500, "User cannot be registered. Please try again."));
  }
};

// Controller to handle user login
exports.login = async (req, res, next) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      next(errorHandler(400, "Please Fill up All the Required Fields"));
    }

       // Check if the email is in valid format
       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!regex.test(email)) {
         return next(errorHandler(400, "Enter a valid email"));
       }
   
    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      next(
        errorHandler(
          401,
          "User is not Registered with Us Please SignUp to Continue"
        )
      );
    }

    // Compare provided password with hashed password
    if (await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, id: user._id, role: "user" },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      user.token = token;
      user.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("access-token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      next(errorHandler(401, "Password is incorrect"));
    }
  } catch (error) {
    // If an error occurs during the process, handle it and return an error response
    console.error(error);
    next(errorHandler(500, "Login Failure Please Try Again"));
  }
};

// Controller to handle user login using Google OAuth
exports.google = async (req, res, next) => {
  // Extract required fields from request body
  const { email, googlePhotoUrl, firstName, lastName } = req.body;
  try {
    // Find user with provided email
    const user = await User.findOne({ email });
    
    // If user already exists
    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: "user", email: user.email },
        process.env.JWT_SECRET,
      );
      
      // Save token to user document in database
      user.password = undefined;
      user.token = token;

      // Set cookie for token and return success response
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({ success: true, user, token, message: `User Login Success` });
    } else {
      // If user does not exist, create a new user with Google OAuth details
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          firstName.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        firstName,
        lastName,
        password: hashedPassword,
        image: googlePhotoUrl,
      });
      await newUser.save();
      
      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, role: "user", email: newUser.email },
        JWT_SECRET
      );
      
      // Set cookie for token and return success response
      user.password = undefined;
      user.token = token;
      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          success: true,
          user,
          token,
          message: `User signed up Successfully`,
        });
    }
  } catch (error) {
    // If an error occurs during the process, handle it and return an error response
    next(error);
  }
};