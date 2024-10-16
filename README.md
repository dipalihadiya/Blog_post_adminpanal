# Blog Panel with Authentication and Topic Management

This project is a blog management system that allows users to create, view, edit, and delete blog posts. The system features user authentication, topic management, and image uploads for blog posts.

## Features

- **User Authentication**: Secure user login and registration, ensuring that only authenticated users can create, edit, or delete their own blogs.
- **Blog Management**: Users can:
  - Create new blog posts.
  - Edit existing blog posts.
  - Delete blog posts.
- **Topic Management**: Users can:
  - Add new topics, which can categorize or group blog posts.
- **Image Uploads**: Blog posts can include images uploaded via Multer.
- **View Blogs**: 
  - View all public blogs.
  - View personal blogs for the logged-in user.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js for handling user authentication.
- **Database**: MongoDB and Mongoose for data modeling.
- **Views**: EJS for rendering dynamic HTML templates.
- **File Uploads**: Multer for handling image uploads.
- **Session Management**: Express sessions to manage logged-in users.

## Usage
## 1. Register or Login:
 Create an account or log in to access blog management features.

## 2. Add Blog:
 Once logged in, navigate to the "Add Blog" section to create a new blog post. 
 You can upload an image for the post.

## 3. Add Topic:
 You can also add topics, which can group related blog posts together.

## 4. Edit or Delete Blog:
 To edit or delete a blog post, go to "My Blogs" where you can manage your existing posts.

## Install dependencies:
npm install

## Start the application:
npm start

# The application will be running on http://localhost:3000


## Project Structure

```bash
blog-panel-pr2/
│
├── authentication/       # Passport.js strategies and middleware for authentication
├── config/               # Configuration files (e.g., MongoDB connection)
├── controllers/          # Controller logic for handling requests and business logic
├── models/               # Mongoose models for Blog, User, and Topic
├── router/               # Routes for authentication, blog, and topic management
├── views/                # EJS templates for rendering pages
├── upload/               # Directory to store uploaded images
├── index.js              # Main entry point for the application
├── package.json          # Dependencies and scripts for the project
└── package-lock.json     # Lock file for dependencies
