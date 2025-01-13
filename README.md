# emr-rbac-app
EMR System with Role-Based Access Control (RBAC)
Overview
This project implements a Role-Based Access Control (RBAC) system for an Electronic Medical Record (EMR) system using Node.js, Angular, MySQL, and Bootstrap. The system supports different user roles, including admin, doctor, nurse, front desk, biller, and pharmacist, with distinct access permissions for each role.

**Features**
**Role-based access control:** Users are assigned specific roles (admin, doctor, nurse, etc.), and each role has predefined permissions.
**Granular Permissions:** Permissions are split into viewme, readme, writeme, and updateme to control what actions users can perform on each resource.
**Dynamic role management:** Admins can assign and remove permissions dynamically.
**Database-backed permissions:** Permissions are stored in a database, allowing flexibility in role management without code changes.

**Tech Stack**
Frontend: Angular, Bootstrap
Backend: Node.js, Express.js
Database: MySQL
Authentication: JWT (JSON Web Token)

**Project Structure
Backend**
- /server
  - /models
    - user.js          # User model schema
    - role.js          # Role model schema
    - permission.js    # Permission model schema
    - role_permission.js # Role-Permission mapping
  - /controllers
    - userController.js # Controller for user operations
    - authController.js # Controller for authentication
  - /middleware
    - authMiddleware.js # Middleware for JWT authentication
    - permissionMiddleware.js # Middleware for permission authorization
  - /routes
    - userRoutes.js      # Routes for user operations
    - authRoutes.js      # Routes for authentication
  - /config
    - db.js              # Database connection configuration
  - server.js            # Express server setup


- /src
  - /app
    - /services
      - auth.service.ts   # Service to handle authentication and permission checks
    - /components
      - navbar.component.ts # Navigation bar component
    - /pages
      - dashboard.component.ts # User dashboard page
      - login.component.ts # Login page
    - /models
      - user.model.ts      # User model
  - app.module.ts          # Angular module
  - main.ts                # Entry point for Angular application

**Database Schema**
**users Table**
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

**roles Table**
sql
Copy code
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

**permissions Table**

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource VARCHAR(100) NOT NULL UNIQUE,
    viewme BOOLEAN DEFAULT FALSE,
    readme BOOLEAN DEFAULT FALSE,
    writeme BOOLEAN DEFAULT FALSE,
    updateme BOOLEAN DEFAULT FALSE
);

**role_permissions Table**

CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

**Setup Instructions**
git clone https://github.com/olubusade/emr-rbac-app.git
cd emr-rbac-app


**Backend (Node.js)**
1. cd server
2. npm install

3. **Configure the database connection in /server/config/db.js:**
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emr_rbac'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected...');
});

module.exports = db;

4.Start the server
npm start

5. The backend should be running on http://localhost:3000.



**Frontend (Angular)**
1. Install Angular CLI globally if not already installed:
npm install -g @angular/cli

2. Change directory and install dependencies:
cd frontend
npm install

3. Update the auth.service.ts to interact with your backend API (make sure the backend is running before testing):
private apiUrl = 'http://localhost:3000'; // backend URL

4. Start the frontend:
   ng serve
5. The frontend should be running on http://localhost:4200
