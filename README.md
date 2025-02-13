📌 Introduction
This project is a backend web application designed to manage user authentication and data storage using Express.js and MongoDB. It provides secure user registration, login, and search functionalities with JWT-based authentication.

🌟 Core Functionalities:
✔ User Registration: New users can sign up by providing a username, email, password, full name, gender, date of birth, and country. The password is securely hashed before storing it in the database.
✔ User Login: Registered users can log in using their email and password to receive a JWT token for authentication.
✔ Search Users: Users can be searched using either their username or email, and their details are retrieved except for their password.
✔ Protected Profile Access: Once logged in, users can retrieve their own profile by sending a request with their JWT token.

This API is built with security, efficiency, and scalability in mind, ensuring safe data handling and smooth authentication processes.


📌 Tech Stack Used

--> Backend: Express.js (Node.js)
--> Database: MongoDB
--> Authentication: JWT (JSON Web Token)
--> Security: bcrypt for password hashing
--> Testing: Postman

📌 API Endpoints & Usage
1️⃣ User Registration
Endpoint: POST /api/auth/register
Description: Registers a new user and stores their information securely.


2️⃣ User Login
Endpoint: POST /api/auth/login
Description: Authenticates a user and generates a JWT token for session management.


3️⃣ Search User by Username or Email
Endpoint: GET /api/auth/search?query=username_or_email
Description: Fetches user details except for the password.


4️⃣ Get User Profile (Protected Route)
Endpoint: GET /api/auth/profile
Description: Fetches logged-in user’s full profile

📌 Testing with Postman
1️⃣ Register a user ✅
2️⃣ Login and get JWT token ✅
3️⃣ Search user by username/email ✅
4️⃣ Access profile using the JWT token ✅
