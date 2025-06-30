# App's purpose
    To provide a secure and responsive note taking app that demonstrates fullstack skills (React, Node.js Express, Prisma, MySQL) including authentication, CRUD operations, and deployment. It was built
    specifically for Chingu's fullstack Voyage 56 solo project submission.
    (Please make sure to check "Note" section at the end.)

# Major functions
    - User registration, login, logout (JWT-based)
    - Create, read, update, and delete notes
    - MySQL database using Prisma ORM
    - Fullstack project with separate frontend and backend
    - Responsive and clean UI built with React and CSS
    - Deployed with frontend/backend on Render and database on Railway

# Dependencies
    Tech stack
        - Frontend: React, CSS
        - Backend: Node.js, Express, Prisma, MySql
        - Deployment: Render for frontend/backend and Railway for MySql
    Dependencies
        - "axios": "^1.10.0",
        - "jwt-decode": "^4.0.0",
        - "react": "^19.1.0",
        - "react-dom": "^19.1.0",
        - "react-router-dom": "^7.6.2"
        - "@prisma/client": "^6.10.1",
        - "bcryptjs": "^3.0.2",
        - "cors": "^2.8.5",
        - "dotenv": "^16.5.0",
        - "express": "^5.1.0",
        - "jsonwebtoken": "^9.0.2",
        - "nodemon": "^3.1.10",
        - "prisma": "^6.10.1"


# Setup instructions
The setup is pretty standard for a fullstack project implemented using React/Node.js. URLs were added inside
.env files and accessed whereever needed so just the .env needs to be updated for both frontend and backend if you want to manually deploy/build yourself.
Needed values in .env file:
    VITE_BACKEND_URL for frontend
    DATABASE_URL, JWT_SECRET for backend
    
URLs:
    Frontend: https://noteswebsite-notepal-frontend.onrender.com

    Backend: https://noteswebsite-notepal-backend.onrender.com

Test account:
    email: testaccount@gmail.com
    password: Testing@!01

# Note
The first request on the website may take up to 1 minute and after that it will speed up. This could mean issues such as not being able to log in with the provided test account, not being able to create a new account or even loading notes. To solve the issue, simply make a request and wait 1 minute the first time after which the same request won't be invalid anymore moving forward. This is according to render's free plan where inactive websites first take some time to load and then fasten up.