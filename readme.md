# Blog Application

This is a Responsive web application built using Vite for React. It serves as a platform for users to create, view, and interact with blog posts. Users can sign up, log in, create posts, comment on posts, like comments, and perform various other actions related to managing their profile and interacting with content.

## Features

- **Authentication**: Users can sign up, log in, and authenticate themselves to access the application's features.
- **Create and View and edit Posts**: Users can create new blog posts and view posts created by themselves and others.
- **Commenting System**: Users can comment on posts and interact with other users' comments by liking or deleting them.
- **User Profile Management**: Users can update their profile information and delete their account if needed.
- **Error Handling**: The application includes error handling mechanisms to provide a smooth user experience.
- **Pagination**: 9 posts will be rendered at a time, you have to load more to get more
## Technologies Used

- **Vite**: A build tool that provides a fast and optimized development experience for React applications.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside of a web browser.
- **Express.js**: A web application framework for Node.js used for building server-side applications.
- **MongoDB**: A NoSQL database used for storing application data, such as user profiles, posts, and comments.
- **TailwindCss** : A Css Library to style the components
- **Flowbite UI Library** : A tailwind css library 

## Installation

Follow these steps to install and set up the application on your local machine:

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
2. **Navigate to the Project Directory**:
    ```bash
    for client: 
        cd react-client
    for server:
        cd server

3. **Install Dependencies**:
    
        npm install
4.**Start the Development Server**:

        for both(client & user):
            npm run dev


**Open the Application in Your Browser**:

Once the server is running, open your web browser and navigate to http://localhost:5167 to view the application.

## Models
**Post Model**: 
The Post model represents a blog post within the application. It has the following schema:

    1.user: Reference to the User model for the author of the post.
    2.content: Content of the post.
    3.title: Title of the post (must be unique).
    4.image: Image URL for the post (default is "hostinger photo").
    5.category: Category of the post (default is "uncategorized").
    6.slug: Slug for the post (must be unique).
    7.comments: Array of comment IDs associated with the post.
    
    **Indexing**
        1.Index on title field for faster retrieval of posts by title.
        2.Index on user field for efficient retrieval of posts by the user who created them.
        3.Unique index on slug field to ensure each post has a unique slug.
        
**User Model**:
The User model represents a user within the application. It has the following schema:

    1.username: Username of the user (must be unique).
    2.firstName: First name of the user.
    3.lastName: Last name of the user.
    4.email: Email of the user (must be unique).
    5.password: Password of the user.
    6.image: Image URL for the user profile picture.
    
    **Indexing**
        1.Unique index on username field to ensure each username is unique.
        2.Unique index on email field to ensure each email is unique.

**Comment Model**:
The Comment model represents a comment on a blog post within the application. It has the following schema:

    1.content: Content of the comment.
    2.post: Reference to the Post model for the associated post.
    3.user: Reference to the User model for the user who created the comment.
    4.likes: Array of user IDs who liked the comment.
    5.numberOfLikes: Number of likes for the comment.

    **Indexing**
        1.Index on post field for efficient retrieval of comments associated with a particular post.
        2.Index on user field for faster retrieval of comments created by a specific user.(this is for admin only and for future implementation)

## API Endpoints
The application provides the following API endpoints for various functionalities:

**Authentication**:

       #Signup - **POST**: /api/v1/auth/signup
       #Login - **POST**: /api/v1/auth/login
       #Oauth signin- **POST**: /api/v1/auth/google
**Posts**:

        #create post - **POST**: /api/v1/post/create
        #Get posts - **GET**: /api/v1/post/getposts
        #Delete post -**DELETE**: /api/v1/post/delete/:postId/:userId, 
        #Edit Post- **PUT**: /api/v1/post/update/:postId/:userId
**Comments**:

        #Create Comment- **POST**:/api/v1/comment/create
        #Like/Dislike - **POST**: Comment/api/v1/comment/like/:commentId
        #Delete Comment - **DELETE**: /api/v1/comment/delete/:commentId
        #Edit Comment - **PUT**: /api/v1/comment/edit/:commentId
        #Get Comment - **GET**: /api/v1/comment/get/:postId
**Users**:

        #Get User - **GET**: /api/v1/user/get/:userId
        #Update User - **PUT**: /api/v1/user/update/:userId
        #Delete User - **DELETE**: /api/v1/user/delete/:userId

## Middleware: 
    **isAuth**: 
        
        This middleware function is responsible for authenticating requests using JSON Web Tokens (JWT). 
        It extracts the JWT from the request header, verifies its validity using the secret key stored in environment variables, 
        and stores the decoded payload in the request object for further use.

    **isError**:

        to handle error effectively and write a clean code

## environment variables
**For Client**:
    
        VITE_FIREBASE_API_KEY
**For Server**:
        
        # MongoDB connection string for connecting to the database
        DATABASE_URL
        # JWT Secret Key used for signing and verifying JSON Web Tokens
        JWT_SECRET
        # PORT
        PORT

## Page is live at: 
        [text](https://dot-blog-3.onrender.com/)
